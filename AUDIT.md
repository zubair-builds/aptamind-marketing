# Aptamind marketing site audit

Audit date: 20 October 2026

## Outcome

The site has a coherent, high-end product direction: editorial typography, restrained motion, evidence-led
product visuals, and a focused conversion path. The design is intentionally closer to an enterprise data
product than a generic AI landing page. It uses the quality bar of products such as Linear, Vercel, Attio,
Kernel, and Apple without copying their identity or mixing unrelated visual motifs.

The implementation is visually and technically ready for a staging deployment. Public production still has
the explicit blockers listed below.

## Token audit

The primary text combinations meet WCAG AA contrast requirements. Automated axe checks also pass on every
public route at the audited viewport sizes.

| Use                       | Foreground | Background | Contrast |
| ------------------------- | ---------- | ---------- | -------: |
| Primary text              | `#25282a`  | `#f5f6f1`  |  13.66:1 |
| Secondary text            | `#626964`  | `#f5f6f1`  |   5.19:1 |
| Tertiary text             | `#69716b`  | `#f5f6f1`  |   4.63:1 |
| Brand green               | `#174a32`  | `#f5f6f1`  |   9.38:1 |
| CTA label                 | `#ffffff`  | `#174a32`  |  10.18:1 |
| Conversion copy           | `#25282a`  | `#dbe96e`  |  11.23:1 |
| Dark-section accent       | `#c9df4e`  | `#0d1d15`  |  11.75:1 |
| Dark-section body         | `#9299a6`  | `#0d1d15`  |   6.09:1 |
| Dark-card supporting text | `#98a19a`  | `#16291f`  |   5.76:1 |

The radius system is limited to 8, 14, and 22 px. The page uses one Geist Sans family throughout; display,
navigation, labels, and interface data are differentiated with weight, scale, spacing, and color rather than a
decorative or mono typeface. Shadows are reserved for elevated product and conversion surfaces. Chartreuse is
used for emphasis, not body text on a light background.

The landing header and hero use an asymmetric editorial composition rather than a centered headline-and-card
template. Product context is presented as a compact evidence brief, and the concept interface avoids fake
browser chrome. Motion is limited to restrained transforms and state transitions, with no opacity animation on
essential text; reduced-motion preferences collapse all animation and smooth scrolling.

### Type scale

| Role                    | Desktop                    | Mobile                    |
| ----------------------- | -------------------------- | ------------------------- |
| Hero                    | `58–88px`                  | `44–54px`                 |
| Major section heading   | `44–64px`                  | `38–44px`                 |
| Card heading            | `26–30px`                  | `26–30px`                 |
| Supporting copy         | `17–18px`                  | `15–16px`                 |
| Body copy               | `16px`                     | `16px`                    |
| Navigation and controls | `14px`                     | `14–18px`                 |
| Labels and metadata     | `10–11px`, letter-spaced   | `10–11px`, letter-spaced  |
| Illustrative UI         | `9–13px`, composition-only | `9–13px`, mobile-specific |

Paragraph measure is held near 55–70 characters. Text below 10px is limited to non-essential glyphs inside
scaled concept interfaces; page copy, controls, form guidance, and navigation remain at readable sizes.

The layout uses a 72px desktop header and 64px mobile header. The desktop hero stage is capped at 760px and
adapts to the available viewport height, placing the product-preview caption at the fold without clipping the
headline or actions. Major sections share 112–144px desktop, 104px tablet, and 80px mobile vertical spacing.

### Alignment system

- Editorial section introductions are start-aligned to the same 12-column grid.
- The desktop hero aligns its evidence brief to the bottom of the primary message; mobile returns to a single
  start-aligned flow.
- Workflow cards stretch to equal row heights. The first two use-case visuals align to a shared bottom edge.
- The trust composition is center-aligned because the evidence card and explanation have comparable visual
  weight. Demo, FAQ, and footer columns are explicitly start-aligned for predictable scanning.
- The Before and After views remain simultaneously visible. Their structures differ, so a draggable reveal
  would hide context, weaken accessibility, and suggest a pixel-matched transformation that the content does
  not represent.

## Responsive audit

The browser audit covers 1440×900, 1024×768, 768×1024, 390×844, and 360×800. It checks `/`, `/privacy`,
`/terms`, and the 404 page at every size.

- No horizontal overflow was detected.
- The hero maintains intentional line breaks from 360 px through wide desktop.
- The concept product view switches to a purpose-built mobile summary instead of shrinking desktop UI.
- Comparison, workflow, use-case, trust, form, FAQ, footer, and legal layouts collapse without clipped content.
- The sticky header, anchor offsets, and mobile menu were verified in open and closed states.
- Reduced-motion preferences disable smooth scrolling and animation durations.

## Action audit

| Action               | Result                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Header brand         | Returns to the top of the page                                                                      |
| Desktop navigation   | Lands flush at Platform, How it works, and Use cases                                                |
| Header and hero CTAs | Land at Book a demo                                                                                 |
| Mobile menu          | Hidden by default; opens, closes, Escape-dismisses, and closes after navigation                     |
| Explore the Platform | Lands at the product/problem narrative                                                              |
| Concept preview      | Exposed as an illustrative image; contains no false interactive control                             |
| Demo request form    | Client and server validation, loading state, inline errors, success focus, consent, and attribution |
| FAQ rows             | Native keyboard-accessible disclosure controls                                                      |
| Privacy and Terms    | Real routes with canonical metadata and return navigation                                           |
| Footer links         | Resolve to valid internal routes or sections                                                        |
| Unknown routes       | Branded 404 with a working home action                                                              |
| Keyboard bypass      | Visible-on-focus skip link lands at the main content                                                |

## Form and data audit

- The API accepts JSON only, caps request size, validates with Zod, verifies origin, normalizes email, and
  handles duplicate submissions idempotently.
- A honeypot, minimum completion time, and atomic database rate limits reduce automated abuse.
- IP-derived rate-limit identifiers are HMAC pseudonyms; plain IP addresses and user agents are not stored.
- Marketing consent is optional and recorded with its timestamp only when selected.
- Neon Postgres enforces unique emails and constrained use-case values. The public site has no listing API.
- Local memory storage is explicit and forbidden in production.
- The deployment gate rejects placeholder or unsafe environment values; the health endpoint verifies database
  connectivity without returning configuration details.
- Preview deployments are explicitly non-indexable, while production retains canonical metadata, structured
  website data, a sitemap, and platform icon artwork.

## Deployment decision

Use Vercel plus Neon for the first release. Vercel is the lowest-risk host for this existing Next.js app, and
Neon's serverless Postgres driver uses HTTP/WebSockets, which preserves a reasonable future path to edge-style
runtimes. Current Cloudflare guidance recommends Vinext for new full-stack Next.js deployments, so Cloudflare
should be handled as a deliberate migration rather than a last-minute adapter switch.

See [`DEPLOYMENT.md`](DEPLOYMENT.md) and [`database/schema.sql`](database/schema.sql).

## Production blockers

1. Replace the visibly labelled founder-review Privacy and Terms drafts with counsel-approved text.
2. Provide the legal entity, governing law, concrete retention period, and monitored contact/privacy address.
3. Provision Neon, apply the schema, and configure the production environment variables.
4. Run one end-to-end submission against the deployed origin and confirm the row in Neon.
5. Attach and verify the final domain so canonical, sitemap, origin validation, and social metadata share one
   HTTPS hostname.

Do not add invented customer logos, testimonials, performance claims, or usage statistics to create perceived
prestige. The current product demonstration and reliability narrative provide a stronger, more credible signal.
