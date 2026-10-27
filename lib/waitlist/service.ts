import { createHmac } from 'node:crypto';
import { neon } from '@neondatabase/serverless';
import { publicSiteUrl } from '@/lib/site-config';
import {
  waitlistSubmissionSchema,
  type WaitlistRecord,
  type WaitlistSubmission,
} from '@/lib/waitlist/schema';

const MAX_BODY_BYTES = 16_384;
const MIN_FORM_TIME_MS = 1_200;
const MAX_FORM_AGE_MS = 86_400_000;

export interface WaitlistStore {
  save(record: WaitlistRecord): Promise<'created' | 'existing'>;
}

export interface RateLimiter {
  take(key: string, limit: number, windowMs: number): Promise<boolean>;
}

export type SubmitDependencies = {
  store: WaitlistStore;
  rateLimiter: RateLimiter;
  hashKey: string;
  now?: () => Date;
  expectedOrigin?: string;
};

type NeonSql = ReturnType<typeof neon>;

class PostgresWaitlistStore implements WaitlistStore {
  constructor(private readonly sql: NeonSql) {}

  async save(record: WaitlistRecord) {
    const rows = (await this.sql`
      INSERT INTO waitlist_registrations (
        email_normalized,
        role,
        company,
        use_case,
        marketing_consent,
        consent_recorded_at,
        attribution,
        created_at
      ) VALUES (
        ${record.emailNormalized},
        ${record.role ?? null},
        ${record.company ?? null},
        ${record.useCase ?? null},
        ${record.marketingConsent},
        ${record.consentRecordedAt?.toISOString() ?? null},
        ${record.attribution ? JSON.stringify(record.attribution) : null},
        ${record.createdAt.toISOString()}
      )
      ON CONFLICT (email_normalized) DO NOTHING
      RETURNING email_normalized
    `) as Record<string, unknown>[];
    return rows.length === 1 ? 'created' : 'existing';
  }
}

class PostgresRateLimiter implements RateLimiter {
  constructor(
    private readonly sql: NeonSql,
    private readonly now: () => Date = () => new Date(),
  ) {}

  async take(key: string, limit: number, windowMs: number) {
    const now = this.now();
    const bucket = Math.floor(now.getTime() / windowMs);
    const bucketKey = `${key}:${windowMs}:${bucket}`;
    const expiresAt = new Date((bucket + 2) * windowMs);
    const rows = (await this.sql`
      INSERT INTO waitlist_rate_limits (key, count, expires_at)
      VALUES (${bucketKey}, 1, ${expiresAt.toISOString()})
      ON CONFLICT (key) DO UPDATE
      SET count = waitlist_rate_limits.count + 1
      RETURNING count
    `) as Record<string, unknown>[];
    return Number(rows[0]?.count ?? limit + 1) <= limit;
  }
}

class MemoryWaitlistStore implements WaitlistStore {
  private readonly records = new Set<string>();

  async save(record: WaitlistRecord) {
    if (this.records.has(record.emailNormalized)) return 'existing' as const;
    this.records.add(record.emailNormalized);
    return 'created' as const;
  }
}

class MemoryRateLimiter implements RateLimiter {
  private readonly buckets = new Map<string, { count: number; expiresAt: number }>();

  async take(key: string, limit: number, windowMs: number) {
    const now = Date.now();
    const current = this.buckets.get(key);
    const bucket = current && current.expiresAt > now ? current : { count: 0, expiresAt: now + windowMs };
    bucket.count += 1;
    this.buckets.set(key, bucket);
    return bucket.count <= limit;
  }
}

const globalForWaitlist = globalThis as typeof globalThis & {
  waitlistSql?: NeonSql;
  waitlistCleanupAt?: number;
  waitlistMemory?: { store: MemoryWaitlistStore; limiter: MemoryRateLimiter };
  schemaEnsured?: boolean;
};

function getDatabaseUrl() {
  return (
    process.env.WAITLIST_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL
  );
}

function connectPostgres() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    throw new Error('Demo request storage is not configured.');
  }
  globalForWaitlist.waitlistSql ??= neon(databaseUrl);
  return globalForWaitlist.waitlistSql;
}

async function ensureSchema(sql: NeonSql) {
  if (globalForWaitlist.schemaEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist_registrations (
      email_normalized TEXT PRIMARY KEY,
      role TEXT,
      company TEXT,
      use_case TEXT CHECK (
        use_case IS NULL
        OR use_case IN (
          'company-sales',
          'market-competitive',
          'opportunity-discovery',
          'something-else'
        )
      ),
      marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
      consent_recorded_at TIMESTAMPTZ,
      attribution JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CHECK (marketing_consent = (consent_recorded_at IS NOT NULL))
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist_rate_limits (
      key TEXT PRIMARY KEY,
      count INTEGER NOT NULL CHECK (count > 0),
      expires_at TIMESTAMPTZ NOT NULL
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS waitlist_rate_limits_expires_at_idx
      ON waitlist_rate_limits (expires_at)
  `;
  globalForWaitlist.schemaEnsured = true;
}

export async function checkWaitlistStorage() {
  if (process.env.WAITLIST_STORAGE === 'memory') {
    if (process.env.NODE_ENV === 'production') return false;
    return true;
  }
  const sql = connectPostgres();
  const rows = (await sql`SELECT 1 AS ready`) as Record<string, unknown>[];
  return Number(rows[0]?.ready) === 1;
}

async function cleanExpiredRateLimits(sql: NeonSql) {
  const now = Date.now();
  if ((globalForWaitlist.waitlistCleanupAt ?? 0) > now - 60 * 60_000) return;
  globalForWaitlist.waitlistCleanupAt = now;
  await sql`DELETE FROM waitlist_rate_limits WHERE expires_at < NOW()`;
}

export async function getSubmitDependencies(): Promise<SubmitDependencies> {
  const hashKey = process.env.WAITLIST_HASH_KEY;
  if (process.env.WAITLIST_STORAGE === 'memory') {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('In-memory waitlist storage is forbidden in production.');
    }
    const memory = globalForWaitlist.waitlistMemory ?? {
      store: new MemoryWaitlistStore(),
      limiter: new MemoryRateLimiter(),
    };
    globalForWaitlist.waitlistMemory = memory;
    return {
      store: memory.store,
      rateLimiter: memory.limiter,
      hashKey: hashKey ?? 'local-development-only-hash-key',
      expectedOrigin: publicSiteUrl?.origin,
    };
  }
  if (!hashKey || hashKey.length < 32) {
    throw new Error('WAITLIST_HASH_KEY must contain at least 32 characters.');
  }
  const sql = connectPostgres();
  await ensureSchema(sql);
  await cleanExpiredRateLimits(sql);
  return {
    store: new PostgresWaitlistStore(sql),
    rateLimiter: new PostgresRateLimiter(sql),
    hashKey,
    expectedOrigin: publicSiteUrl?.origin,
  };
}

const response = (body: object, status: number) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });

function requestOriginIsAllowed(request: Request, expectedOrigin?: string) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return origin === (expectedOrigin ?? new URL(request.url).origin);
}

function identifier(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unavailable';
}

function hmac(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('hex');
}

function invalidFields(error: ReturnType<typeof waitlistSubmissionSchema.safeParse>) {
  if (error.success) return undefined;
  return error.error.flatten().fieldErrors;
}

export async function submitEarlyAccess(request: Request, dependencies: SubmitDependencies) {
  if (!requestOriginIsAllowed(request, dependencies.expectedOrigin)) {
    return response({ ok: false, message: 'This request could not be verified.' }, 403);
  }
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return response({ ok: false, message: 'Unsupported request format.' }, 415);
  }
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return response({ ok: false, message: 'The submission is too large.' }, 413);
  }

  let raw: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return response({ ok: false, message: 'The submission is too large.' }, 413);
    }
    raw = JSON.parse(body);
  } catch {
    return response({ ok: false, message: 'The submission could not be read.' }, 400);
  }

  const parsed = waitlistSubmissionSchema.safeParse(raw);
  if (!parsed.success) {
    return response(
      { ok: false, message: 'Check the highlighted fields and try again.', fields: invalidFields(parsed) },
      422,
    );
  }

  const now = dependencies.now?.() ?? new Date();
  const elapsed = now.getTime() - parsed.data.startedAt;
  if (parsed.data.website || elapsed < MIN_FORM_TIME_MS || elapsed > MAX_FORM_AGE_MS) {
    return response({ ok: true, message: 'Thanks. Your request has been received.' }, 202);
  }

  const ipKey = hmac(`ip:${identifier(request)}`, dependencies.hashKey);
  const emailKey = hmac(`email:${parsed.data.email}`, dependencies.hashKey);
  const [ipAllowed, emailAllowed] = await Promise.all([
    dependencies.rateLimiter.take(ipKey, 5, 10 * 60_000),
    dependencies.rateLimiter.take(emailKey, 3, 60 * 60_000),
  ]);
  if (!ipAllowed || !emailAllowed) {
    return response(
      { ok: false, message: 'Too many requests. Please wait a little before trying again.' },
      429,
    );
  }

  const record: WaitlistRecord = {
    emailNormalized: parsed.data.email,
    role: parsed.data.role,
    company: parsed.data.company,
    useCase: parsed.data.useCase,
    marketingConsent: parsed.data.marketingConsent,
    consentRecordedAt: parsed.data.marketingConsent ? now : undefined,
    attribution: parsed.data.attribution,
    createdAt: now,
  };

  try {
    await dependencies.store.save(record);
  } catch {
    return response(
      { ok: false, message: 'We could not save your request right now. Please try again shortly.' },
      503,
    );
  }
  return response({ ok: true, message: 'Thanks. Your request has been received.' }, 201);
}

export type { WaitlistSubmission };
