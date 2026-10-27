# Aptamind Marketing

The public marketing application. It is deliberately isolated from the internal API,
admin app, workflow runtime, and domain packages.

## Local development

```bash
pnpm dev
```

The app runs at `http://127.0.0.1:3001`. In development, the demo request form uses an ephemeral
in-process store only when `WAITLIST_STORAGE=memory` is explicitly set. This mode is never allowed
in production. Copy `.env.example` to `.env.local` when testing the complete production data path.

## Production configuration

Set the following variables for deployment:

| Variable                    | Required | Purpose                                                                |
| --------------------------- | -------- | ---------------------------------------------------------------------- |
| `PUBLIC_SITE_URL`           | Yes      | Canonical public origin used for metadata, sitemap, and origin checks. |
| `WAITLIST_DATABASE_URL`     | Yes      | Neon Postgres connection string for the dedicated waitlist database.   |
| `WAITLIST_HASH_KEY`         | Yes      | At least 32 characters, used to pseudonymize rate-limit identifiers.   |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes      | Contact address shown in the footer and legal pages.                   |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No   | Google Analytics 4 measurement ID, such as `G-XXXXXXXXXX`.             |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console HTML verification token.                     |

Set the two optional Google variables for the production deployment to enable GA4 traffic measurement and
Search Console ownership verification. They are intentionally omitted from local and preview deployments
unless explicitly configured.

Create a dedicated Neon database or branch for the public website, run `database/schema.sql`, and give the
runtime role access only to the two waitlist tables. Do not reuse Aptamind's internal application database.
Email uniqueness is enforced by the database, expired rate-limit buckets are removed opportunistically, and
no public listing endpoint exists.

## Founder export

With `WAITLIST_DATABASE_URL` set, export registrations from a trusted shell:

```bash
pnpm export:waitlist > demo-requests.csv
```

The command writes CSV to stdout and never starts a public endpoint. Treat the export as personal
data and store it securely.

## Data handling

The form stores the normalized email, optional role/company/use-case, consent state and timestamp,
limited UTM attribution, and creation time. Plain IP addresses and user agents are not
stored. Rate-limit keys are HMAC pseudonyms and expire automatically. Deletion requests should be
handled by locating the normalized email in the dedicated database and removing the record. The
Privacy and Terms pages are implementation-aligned drafts and require founder/legal review before
public deployment.

## Recommended deployment

Use Vercel for the first release and set the project root to this repository.
Configure the four production variables above for Production and Preview as appropriate. Vercel is the
lowest-risk target for this Next.js application; Cloudflare deployment should be treated as a separate adapter
or Vinext migration project rather than an interchangeable build target.

Before a release, validate the environment with:

```bash
pnpm verify:deployment
```

The command rejects non-HTTPS canonical URLs, placeholder contact details or secrets, non-Postgres database
URLs, and in-memory storage. Once deployed, `/api/health` returns `200` only when the required production
configuration is present and the waitlist database responds. Preview deployments emit `noindex` metadata and
disallow crawling by default.
