const SourceIcon = ({ label }: { label: string }) => (
  <span className="source-icon" aria-hidden="true">
    {label.slice(0, 1)}
  </span>
);

export function ProductPreview() {
  return (
    <div className="product-preview" role="img" aria-label="Conceptual Aptamind product interface">
      <div className="preview-topbar">
        <div className="preview-product-mark" aria-hidden="true">
          <span>A</span>
          <b>Aptamind intelligence</b>
        </div>
        <div className="preview-breadcrumb">
          <span>Intelligence</span>
          <b>/</b>
          <strong>Company graph</strong>
        </div>
        <span className="concept-badge">Concept preview</span>
      </div>
      <div className="preview-body">
        <aside className="preview-sidebar" aria-label="Concept sources">
          <div className="sidebar-title">
            <span>Sources</span>
            <b>4 active</b>
          </div>
          <div className="source-row is-active">
            <SourceIcon label="C" />
            <span>Company records</span>
            <b>12</b>
          </div>
          <div className="source-row">
            <SourceIcon label="N" />
            <span>Market notes</span>
            <b>7</b>
          </div>
          <div className="source-row">
            <SourceIcon label="W" />
            <span>Public web</span>
            <b>18</b>
          </div>
          <div className="source-row">
            <SourceIcon label="R" />
            <span>Research files</span>
            <b>5</b>
          </div>
          <div className="sidebar-foot">
            <span className="pulse-dot" /> Evidence connected
          </div>
        </aside>
        <div className="preview-main">
          <div className="preview-heading">
            <div>
              <span className="mono-label">UNIFIED RECORD / CO-028</span>
              <h3>Northstar Systems</h3>
            </div>
            <span className="record-status">
              <i /> Reconciled
            </span>
          </div>
          <div className="record-tabs">
            <span className="active">Overview</span>
            <span>Relationships</span>
            <span>Evidence</span>
          </div>
          <div className="entity-canvas">
            <svg className="entity-lines" viewBox="0 0 700 300" preserveAspectRatio="none" aria-hidden="true">
              <path d="M90 75 C180 75 180 150 270 150" />
              <path d="M90 225 C180 225 180 150 270 150" />
              <path d="M430 150 C520 150 520 72 610 72" />
              <path d="M430 150 C520 150 520 225 610 225" />
            </svg>
            <div className="entity-node source-node node-one">
              <span>01</span>
              <b>Registry record</b>
              <small>Legal entity · UK</small>
            </div>
            <div className="entity-node source-node node-two">
              <span>02</span>
              <b>Market note</b>
              <small>Expansion signal</small>
            </div>
            <div className="entity-node core-node">
              <div className="mini-brand">A</div>
              <b>Northstar Systems</b>
              <small>Unified company</small>
              <em>8 linked attributes</em>
            </div>
            <div className="entity-node result-node node-three">
              <span className="node-dot purple" />
              <b>Aster Cloud</b>
              <small>Technology partner</small>
            </div>
            <div className="entity-node result-node node-four">
              <span className="node-dot amber" />
              <b>Growth signal</b>
              <small>New market activity</small>
            </div>
          </div>
        </div>
        <aside className="insight-panel">
          <div className="panel-label">
            <span>Contextual insight</span>
            <b>New</b>
          </div>
          <div className="insight-symbol" aria-hidden="true">
            ↗
          </div>
          <h4>Potential expansion activity</h4>
          <p>Recent market notes and a newly linked entity suggest activity in a second region.</p>
          <div className="evidence-stack">
            <span>
              <SourceIcon label="N" /> Market note <b>2d</b>
            </span>
            <span>
              <SourceIcon label="R" /> Registry change <b>6d</b>
            </span>
          </div>
          <div className="preview-action" aria-hidden="true">
            Review evidence <span>→</span>
          </div>
        </aside>
      </div>
      <div className="preview-mobile-summary">
        <span className="mono-label">UNIFIED RECORD / CO-028</span>
        <div className="mobile-record-head">
          <div className="mini-brand">A</div>
          <div>
            <h3>Northstar Systems</h3>
            <p>8 linked attributes</p>
          </div>
          <span className="record-status">
            <i /> Reconciled
          </span>
        </div>
        <div className="mobile-flow">
          <span>4 sources</span>
          <i>→</i>
          <span>1 record</span>
          <i>→</i>
          <span>2 signals</span>
        </div>
        <div className="mobile-insight">
          <span className="insight-symbol">↗</span>
          <div>
            <b>Potential expansion activity</b>
            <p>Supported by two recent pieces of evidence.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
