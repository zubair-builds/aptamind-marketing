import { EarlyAccessForm } from '../early-access-form';

export function EarlyAccess() {
  return (
    <section className="early-access-section" id="early-access">
      <div className="shell access-shell">
        <div className="access-copy">
          <p className="eyebrow light-eyebrow">
            <span /> Book a demo
          </p>
          <h2>See Aptamind on a real intelligence problem.</h2>
          <p>
            Book a walkthrough of the platform. We’ll review your workflow and show how Aptamind connects
            sources, resolves context, and keeps evidence attached.
          </p>
          <div className="access-details">
            <span>
              <i>01</i> Tell us where context breaks down
            </span>
            <span>
              <i>02</i> We schedule a focused demo
            </span>
            <span>
              <i>03</i> Explore fit for a private beta
            </span>
          </div>
        </div>
        <EarlyAccessForm />
      </div>
    </section>
  );
}
