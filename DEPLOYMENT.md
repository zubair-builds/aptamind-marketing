# Marketing site deployment

## Recommended launch stack

- **Hosting:** Vercel
- **Database:** Neon Postgres, in a dedicated project or branch
- **DNS:** the Aptamind public domain pointed at the Vercel production project
- **Runtime:** Next.js Node.js route handler for `/api/early-access`

This is the lowest-risk first release for the current Next.js application. Cloudflare is viable, but its
recommended full-stack path is a Vinext deployment or migration. Treat that as a deliberate platform project,
not a build-target toggle immediately before launch.

## Provision Neon

1. Create a dedicated database or branch for the public marketing site.
2. Run [`database/schema.sql`](database/schema.sql) in the Neon SQL editor.
3. Create a least-privileged runtime role with `SELECT`, `INSERT`, `UPDATE`, and `DELETE` access only to
   `waitlist_registrations` and `waitlist_rate_limits`.
4. Store its pooled connection string as `WAITLIST_DATABASE_URL` in Vercel.
5. Use a separate trusted connection when exporting or administering submissions.

## Configure Vercel

Create a project from the monorepo and select `apps/marketing` as the application root. Keep source files
outside the root available so pnpm can resolve the workspace lockfile and the configured Turbopack root.

Set these variables for Production:

| Variable                    | Value                                                         |
| --------------------------- | ------------------------------------------------------------- |
| `PUBLIC_SITE_URL`           | Final HTTPS origin, without a trailing path                   |
| `WAITLIST_DATABASE_URL`     | Dedicated Neon Postgres connection string                     |
| `WAITLIST_HASH_KEY`         | At least 32 random characters; generate and store as a secret |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Monitored Aptamind contact/privacy address                    |

Do not set `WAITLIST_STORAGE=memory` in a production or preview deployment.

Run the deterministic configuration gate in the deployment environment before releasing:

```bash
pnpm --filter @aptamind/marketing verify:deployment
```

The check requires an HTTPS origin without a path, a PostgreSQL connection URL, a non-placeholder hash key,
and a monitored contact address. Preview deployments are marked `noindex` automatically when `VERCEL_ENV`
is `preview` or `development`.

## Release gate

Before attaching the production domain:

1. Replace the founder-review legal drafts with counsel-approved Privacy and Terms text.
2. Confirm the legal entity, governing law, retention period, and contact address.
3. Run `verify:deployment`, then build and run the production bundle with the deployment variables.
4. Confirm `/api/health` returns `200`; it checks configuration and database connectivity without exposing
   infrastructure details.
5. Submit one real early-access request and confirm the row in Neon.
6. Submit the same email again and confirm the response remains idempotent.
7. Verify `/`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and
   `/opengraph-image` on the final origin.
8. Test keyboard navigation, reduced-motion mode, and 360 px, 390 px, 768 px, 1024 px, and 1440 px layouts.
9. Confirm the custom domain redirects HTTP to HTTPS and the canonical URL uses the same hostname.

## Operational notes

- The public API exposes submission only; it has no listing or export route.
- Plain IP addresses are not stored. Rate-limit identifiers are HMAC pseudonyms.
- Expired rate-limit rows are cleaned opportunistically by the application.
- Export registrations only from a trusted shell with `pnpm --filter @aptamind/marketing export:waitlist`.
- Add error monitoring after the domain is configured, but do not send form field values or email addresses to
  logs or analytics.
