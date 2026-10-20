import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.WAITLIST_DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Set WAITLIST_DATABASE_URL before exporting.');
}

const escapeCsv = (value: unknown) => {
  if (value === undefined || value === null) return '';
  const text = value instanceof Date ? value.toISOString() : String(value);
  return `"${text.replaceAll('"', '""')}"`;
};

const sql = neon(databaseUrl);
const registrations = (await sql`
  SELECT
    email_normalized,
    role,
    company,
    use_case,
    marketing_consent,
    consent_recorded_at,
    created_at,
    attribution
  FROM waitlist_registrations
  ORDER BY created_at ASC
`) as Record<string, unknown>[];
const columns = [
  'emailNormalized',
  'role',
  'company',
  'useCase',
  'marketingConsent',
  'consentRecordedAt',
  'createdAt',
  'utmSource',
  'utmMedium',
  'utmCampaign',
];
process.stdout.write(`${columns.join(',')}\n`);
for (const row of registrations) {
  const attribution = row.attribution as Record<string, unknown> | null;
  process.stdout.write(
    `${[
      row.email_normalized,
      row.role,
      row.company,
      row.use_case,
      row.marketing_consent,
      row.consent_recorded_at,
      row.created_at,
      attribution?.utm_source,
      attribution?.utm_medium,
      attribution?.utm_campaign,
    ]
      .map(escapeCsv)
      .join(',')}\n`,
  );
}
