export function Trust() {
  return (
    <section className="trust-section">
      <div className="trust-grid" aria-hidden="true" />
      <div className="shell trust-shell">
        <div className="trust-copy">
          <p className="section-number light-number">04 / Reliability by design</p>
          <h2>
            Intelligence you can trace <span>back to its source.</span>
          </h2>
          <p>
            Aptamind is designed to show the evidence behind an answer, what changed, and where uncertainty
            remains, so teams can inspect before they act.
          </p>
          <div className="trust-principles">
            <div>
              <span>01</span>
              <p>
                <b>Traceable evidence</b>
                <small>Follow each insight back to its supporting sources.</small>
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <b>Reconciled records</b>
                <small>See related facts together without concealing conflict.</small>
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <b>Explicit uncertainty</b>
                <small>Know what is supported, inferred, or unresolved.</small>
              </p>
            </div>
            <div>
              <span>04</span>
              <p>
                <b>Refreshable context</b>
                <small>Keep context current as source information changes.</small>
              </p>
            </div>
          </div>
        </div>
        <div className="provenance-card">
          <div className="provenance-top">
            <span className="concept-badge dark-badge">Concept preview</span>
            <span className="mono-label">FACT PROVENANCE</span>
          </div>
          <div className="fact-heading">
            <small>Selected fact</small>
            <h3>Operating region: Europe</h3>
            <span className="confidence-label">
              <i /> Supported by 3 sources
            </span>
          </div>
          <div className="evidence-timeline">
            <article>
              <span className="timeline-node verified">✓</span>
              <div>
                <small>PUBLIC REGISTRY · 09:42 UTC</small>
                <b>Registered branch address</b>
                <p>Official record · updated 6 days ago</p>
              </div>
              <em>Primary</em>
            </article>
            <article>
              <span className="timeline-node">N</span>
              <div>
                <small>MARKET NOTE · 14:08 UTC</small>
                <b>Regional operating announcement</b>
                <p>Research note · captured 2 days ago</p>
              </div>
              <em>Supporting</em>
            </article>
            <article>
              <span className="timeline-node">W</span>
              <div>
                <small>PUBLIC WEB · 16:31 UTC</small>
                <b>Regional contact page</b>
                <p>Company source · refreshed today</p>
              </div>
              <em>Supporting</em>
            </article>
          </div>
          <div className="provenance-footer">
            <span>
              Reconciliation rule <b>3 sources agree</b>
            </span>
            <span>
              Uncertainty <b className="low-risk">Low</b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
