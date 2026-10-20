import type { Metadata } from 'next';
import { Brand } from '@/components/brand';
import { contactEmail } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Website terms',
  description: 'Terms for using the Aptamind pre-launch website.',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <main className="legal-page" id="main-content">
      <nav>
        <a href="/" aria-label="Aptamind home">
          <Brand />
        </a>
        <a href="/">← Back to website</a>
      </nav>
      <article>
        <p className="section-number">Terms / Founder review draft</p>
        <h1>Website terms</h1>
        <p className="legal-lede">
          These terms are a plain-language draft for Aptamind&apos;s pre-launch website. They should be
          reviewed and completed by the founder and legal counsel before public deployment.
        </p>
        <p className="legal-meta">Last updated: 19 October 2026</p>
        <h2>About this website</h2>
        <p>
          This website introduces Aptamind&apos;s product direction and accepts expressions of interest in
          early access. Aptamind is in development. Concept previews, examples, and descriptions on this
          website are illustrative and do not promise that a particular feature, integration, access date, or
          commercial offering will be available.
        </p>
        <h2>Early-access requests</h2>
        <p>
          Submitting the form does not create an account, guarantee access, establish a customer relationship,
          or require either party to enter a future agreement. We may contact you to learn more about your use
          case or invite you to a suitable programme.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not interfere with the website, attempt to bypass its safeguards, submit unlawful material, or
          use automated means to overload the early-access form.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The Aptamind name, visual identity, website design, and original content are reserved to their
          respective owner. You may view and share links to the public website, but you may not misrepresent
          its content or imply an endorsement.
        </p>
        <h2>No warranties</h2>
        <p>
          The pre-launch website is provided on an “as available” basis. To the extent permitted by law, no
          warranty is made that it will always be available, error-free, or suitable for a particular purpose.
        </p>
        <h2>Changes</h2>
        <p>
          These terms may change as the product and early-access programme develop. A revised date will be
          shown on this page.
        </p>
        <h2>Contact</h2>
        <p>
          {contactEmail ? (
            <>
              Questions may be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </>
          ) : (
            <>
              A contact address and the relevant legal entity and governing law must be added before public
              deployment.
            </>
          )}
        </p>
      </article>
    </main>
  );
}
