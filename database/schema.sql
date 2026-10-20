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
);

CREATE TABLE IF NOT EXISTS waitlist_rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL CHECK (count > 0),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS waitlist_rate_limits_expires_at_idx
  ON waitlist_rate_limits (expires_at);
