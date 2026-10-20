import type { Metadata } from 'next';
import { Brand } from '@/components/brand';
import { contactEmail } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'How the Aptamind early-access website handles personal information.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <main className="legal-page" id="main-content">
      <nav>
        <a href="/" aria-label="Aptamind home">
          <Brand />
        </a>
        <a href="/">← Back to website</a>
      </nav>
      <article>
        <p className="section-number">Privacy / Founder review draft</p>
        <h1>Privacy notice</h1>
        <p className="legal-lede">
          This notice describes the data practices implemented for Aptamind&apos;s pre-launch website. It
          should be reviewed by the founder and legal counsel before public deployment.
        </p>
        <p className="legal-meta">Last updated: 19 October 2026</p>
        <h2>Information we collect</h2>
        <p>
          When you request early access, we collect your email address and any role, company, or use-case
          details you choose to provide. If you opt in to marketing communications, we record that choice and
          the time it was made. We may also store limited UTM parameters from the page URL so we can
          understand how visitors reached the site.
        </p>
        <h2>How we use it</h2>
        <p>
          We use this information to review early-access requests, contact potential users or design partners,
          understand areas of interest and, only with your optional consent, send product news and
          early-access updates.
        </p>
        <h2>Abuse prevention</h2>
        <p>
          The form uses temporary, pseudonymized network identifiers to limit automated or excessive
          submissions. Plain IP addresses and user-agent strings are not stored in the waitlist database.
          Rate-limit records expire automatically.
        </p>
        <h2>Storage and retention</h2>
        <p>
          Early-access data is stored in a dedicated database, separate from Aptamind&apos;s internal
          intelligence systems. The founder should define and publish a concrete retention period before
          launch. Until then, information should be kept only as long as needed to run the early-access
          programme or meet legal obligations.
        </p>
        <h2>Sharing</h2>
        <p>
          We do not sell early-access information. Service providers may process information solely to operate
          the website and its database, subject to appropriate contractual and security terms.
        </p>
        <h2>Your choices</h2>
        <p>
          You can decline marketing communications without affecting an early-access request. You may ask to
          access, correct, or delete your submission, subject to applicable law.
        </p>
        <h2>Contact</h2>
        <p>
          {contactEmail ? (
            <>
              Send privacy questions or requests to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </>
          ) : (
            <>A privacy contact address must be configured before public deployment.</>
          )}
        </p>
      </article>
    </main>
  );
}
