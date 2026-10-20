import { EarlyAccessForm } from '../early-access-form';

export function EarlyAccess() {
  return (
    <section className="early-access-section" id="early-access">
      <div className="shell access-shell">
        <div className="access-copy">
          <p className="eyebrow light-eyebrow">
            <span /> Early access
          </p>
          <h2>Bring your hardest intelligence problem.</h2>
          <p>
            We&apos;re inviting a small group of teams to shape Aptamind around real, high-value research and
            decision workflows.
          </p>
          <div className="access-details">
            <span>
              <i>01</i> Tell us where context breaks down
            </span>
            <span>
              <i>02</i> Shape the intelligence workflow
            </span>
            <span>
              <i>03</i> Join when your use case is a strong fit
            </span>
          </div>
        </div>
        <EarlyAccessForm />
      </div>
    </section>
  );
}
