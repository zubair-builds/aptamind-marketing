import { describe, expect, it } from 'vitest';
import { submitEarlyAccess, type RateLimiter, type WaitlistStore } from './service';
import type { WaitlistRecord } from './schema';

const now = new Date('2026-10-19T10:00:00.000Z');

class Store implements WaitlistStore {
  records: WaitlistRecord[] = [];
  fail = false;
  async save(record: WaitlistRecord) {
    if (this.fail) throw new Error('unavailable');
    const existing = this.records.some((item) => item.emailNormalized === record.emailNormalized);
    if (!existing) this.records.push(record);
    return existing ? ('existing' as const) : ('created' as const);
  }
}

class Limiter implements RateLimiter {
  allowed = true;
  async take() {
    return this.allowed;
  }
}

const validBody = {
  email: '  PERSON@Example.com ',
  role: 'Strategy lead',
  company: 'Northstar Labs',
  useCase: 'market-competitive',
  marketingConsent: true,
  website: '',
  startedAt: now.getTime() - 3_000,
  attribution: { utm_source: 'founder-note' },
};

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request('https://aptamind.test/api/early-access', {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: { 'content-type': 'application/json', origin: 'https://aptamind.test', ...headers },
  });
}

function dependencies(store = new Store(), limiter = new Limiter()) {
  return {
    store,
    rateLimiter: limiter,
    hashKey: 'a-secure-test-key-that-is-long-enough',
    now: () => now,
    expectedOrigin: 'https://aptamind.test',
  };
}

describe('early-access submission', () => {
  it('normalizes and stores a valid registration', async () => {
    const deps = dependencies();
    const response = await submitEarlyAccess(request(validBody), deps);
    expect(response.status).toBe(201);
    expect(deps.store.records).toHaveLength(1);
    expect(deps.store.records[0]).toMatchObject({
      emailNormalized: 'person@example.com',
      marketingConsent: true,
      consentRecordedAt: now,
    });
  });

  it('treats a duplicate idempotently without disclosing it', async () => {
    const deps = dependencies();
    const first = await submitEarlyAccess(request(validBody), deps);
    const second = await submitEarlyAccess(request(validBody), deps);
    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(await second.json()).toEqual(await first.json());
    expect(deps.store.records).toHaveLength(1);
  });

  it('returns field errors for an invalid email', async () => {
    const response = await submitEarlyAccess(
      request({ ...validBody, email: 'not-an-email' }),
      dependencies(),
    );
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ ok: false, fields: { email: expect.any(Array) } });
  });

  it('rejects oversized bodies before storage', async () => {
    const response = await submitEarlyAccess(request('x', { 'content-length': '20000' }), dependencies());
    expect(response.status).toBe(413);
  });

  it('does not claim success when storage fails', async () => {
    const deps = dependencies();
    deps.store.fail = true;
    const response = await submitEarlyAccess(request(validBody), deps);
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ ok: false });
  });

  it('enforces distributed rate-limit decisions', async () => {
    const limiter = new Limiter();
    limiter.allowed = false;
    const response = await submitEarlyAccess(request(validBody), dependencies(new Store(), limiter));
    expect(response.status).toBe(429);
  });

  it('rejects cross-origin submissions', async () => {
    const response = await submitEarlyAccess(
      request(validBody, { origin: 'https://attacker.example' }),
      dependencies(),
    );
    expect(response.status).toBe(403);
  });

  it('records no consent timestamp when marketing consent is absent', async () => {
    const deps = dependencies();
    await submitEarlyAccess(request({ ...validBody, marketingConsent: false }), deps);
    expect(deps.store.records[0]?.consentRecordedAt).toBeUndefined();
  });
});
