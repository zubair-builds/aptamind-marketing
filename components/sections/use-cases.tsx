export function UseCases() {
  return (
    <section className="section use-cases-section" id="use-cases">
      <div className="shell">
        <div className="section-intro split-intro use-case-intro">
          <p className="section-number">03 / Intelligence applications</p>
          <div>
            <h2>
              One intelligence layer. <span>Built to answer the next question.</span>
            </h2>
            <p>
              Start with company, market, and opportunity work, then adapt the same connected context to new
              decisions.
            </p>
          </div>
        </div>
        <div className="use-case-grid">
          <article className="use-case-card sales-card">
            <div className="use-case-copy">
              <span className="card-index">01</span>
              <h3>Company &amp; Sales Intelligence</h3>
              <p>
                See companies as living networks of facts, relationships, changes, and opportunities rather
                than static rows.
              </p>
            </div>
            <div className="account-visual" aria-hidden="true">
              <div className="account-head">
                <div className="company-monogram">N</div>
                <span>
                  <b>Northstar Systems</b>
                  <small>Company profile</small>
                </span>
                <em>Watching</em>
              </div>
              <div className="account-line">
                <span>Relationship map</span>
                <b>12 connected entities</b>
              </div>
              <div className="relationship-row">
                <i>N</i>
                <span />
                <i>A</i>
                <span />
                <i>V</i>
              </div>
              <div className="signal-pill">
                <i /> New market signal detected <b>→</b>
              </div>
            </div>
          </article>
          <article className="use-case-card market-card">
            <div className="use-case-copy">
              <span className="card-index">02</span>
              <h3>Market Intelligence</h3>
              <p>
                Track category movement and emerging signals without stitching the evidence together by hand.
              </p>
            </div>
            <div className="market-visual" aria-hidden="true">
              <div className="chart-head">
                <span>Market activity</span>
                <small>Illustrative view</small>
              </div>
              <div className="chart-area">
                <div className="chart-grid" />
                <svg viewBox="0 0 500 170" preserveAspectRatio="none">
                  <path
                    className="area"
                    d="M0 150 C75 145 85 120 140 126S210 98 252 110 315 85 350 88 415 35 500 20V170H0Z"
                  />
                  <path
                    className="line"
                    d="M0 150 C75 145 85 120 140 126S210 98 252 110 315 85 350 88 415 35 500 20"
                  />
                </svg>
                <span className="chart-signal">Emerging signal</span>
              </div>
              <div className="chart-legend">
                <span>
                  <i /> Category activity
                </span>
                <b>Evidence from 6 sources</b>
              </div>
            </div>
          </article>
          <article className="use-case-card opportunity-card">
            <div className="use-case-copy">
              <span className="card-index">03</span>
              <h3>Opportunity Intelligence</h3>
              <p>Turn connected evidence into a focused view of what is worth investigating next.</p>
            </div>
            <div className="opportunity-visual" aria-hidden="true">
              <div className="opp-label">Relevant opportunities</div>
              <div className="opp-item is-primary">
                <span>01</span>
                <div>
                  <b>Regional expansion</b>
                  <small>High contextual relevance</small>
                </div>
                <em>Review</em>
              </div>
              <div className="opp-item">
                <span>02</span>
                <div>
                  <b>Partner movement</b>
                  <small>3 related signals</small>
                </div>
                <em>Explore</em>
              </div>
              <div className="opp-item">
                <span>03</span>
                <div>
                  <b>Category shift</b>
                  <small>New evidence</small>
                </div>
                <em>Explore</em>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
