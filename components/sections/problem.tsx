export function Problem() {
  return (
    <section className="section problem-section" id="platform">
      <div className="shell">
        <div className="section-intro split-intro">
          <p className="section-number">01 / The problem</p>
          <div>
            <h2>
              Your information is everywhere. <span>Your understanding shouldn&apos;t be.</span>
            </h2>
            <p>
              The facts that matter sit across tools, files, feeds, and conversations. Aptamind brings them
              together, resolves what conflicts, and keeps the evidence attached.
            </p>
          </div>
        </div>
        <div className="problem-comparison">
          <div className="scatter-panel">
            <div className="comparison-label">
              <span>Before</span>
              <b>Disconnected context</b>
            </div>
            <div className="scatter-canvas" aria-label="Scattered source records">
              <article className="paper-card paper-a">
                <small>CRM / ACCOUNT</small>
                <b>Northstar Ltd</b>
                <span>London · Owner: M. Chen</span>
              </article>
              <article className="paper-card paper-b">
                <small>RESEARCH NOTE</small>
                <b>Entered DACH market?</b>
                <span>Last edited 18 days ago</span>
              </article>
              <article className="paper-card paper-c">
                <small>CSV / ROW 1042</small>
                <b>Northstar Systems</b>
                <span>northstar.io</span>
              </article>
              <article className="paper-card paper-d">
                <small>NEWS SIGNAL</small>
                <b>New office reported</b>
                <span>Source pending review</span>
              </article>
              <span className="loose-tag tag-one">Duplicate?</span>
              <span className="loose-tag tag-two">Outdated</span>
              <span className="loose-tag tag-three">Who owns this?</span>
            </div>
          </div>
          <div className="connected-panel">
            <div className="comparison-label">
              <span>After</span>
              <b>Connected with Aptamind</b>
            </div>
            <div className="connected-record">
              <div className="record-title">
                <div className="company-monogram">N</div>
                <div>
                  <b>Northstar Systems</b>
                  <span>Unified company record</span>
                </div>
                <em>Current</em>
              </div>
              <div className="record-grid">
                <div>
                  <small>Primary domain</small>
                  <b>northstar.io</b>
                  <span>3 sources</span>
                </div>
                <div>
                  <small>Market activity</small>
                  <b>Europe</b>
                  <span>2 linked signals</span>
                </div>
                <div>
                  <small>Relationship</small>
                  <b>Aster Cloud</b>
                  <span>Evidence available</span>
                </div>
                <div>
                  <small>Last refreshed</small>
                  <b>Today</b>
                  <span>Change detected</span>
                </div>
              </div>
              <div className="record-evidence">
                <span>
                  <i className="dot-indigo" /> 4 sources reconciled
                </span>
                <span>View provenance →</span>
              </div>
            </div>
          </div>
        </div>
        <div className="problem-list">
          <span>
            <i>01</i> Scattered sources
          </span>
          <span>
            <i>02</i> Duplicate records
          </span>
          <span>
            <i>03</i> Stale context
          </span>
          <span>
            <i>04</i> Manual research
          </span>
        </div>
      </div>
    </section>
  );
}
