export function ConnectVisual() {
  return (
    <div className="stage-visual connect-visual" aria-hidden="true">
      <span className="source-tile">CRM</span>
      <span className="source-tile">CSV</span>
      <span className="source-tile">WEB</span>
      <div className="flow-line">
        <i />
        <i />
        <i />
      </div>
      <div className="stage-hub">A</div>
    </div>
  );
}

export function UnderstandVisual() {
  return (
    <div className="stage-visual understand-visual" aria-hidden="true">
      <div className="duplicate-record muted-record">
        <i />
        Northstar Ltd.<small>northstar.io</small>
      </div>
      <div className="duplicate-record">
        <i />
        Northstar Systems<small>northstar.io</small>
      </div>
      <div className="merge-bracket">&#125;</div>
      <div className="merged-record">
        <span>✓</span>
        <b>1 entity</b>
      </div>
    </div>
  );
}

export function EnrichVisual() {
  return (
    <div className="stage-visual enrich-visual" aria-hidden="true">
      <div className="enrich-ring">
        <div>
          <span>18</span>
          <small>attributes</small>
        </div>
      </div>
      <div className="enrich-list">
        <span>
          <i /> Industry <b>Infrastructure</b>
        </span>
        <span>
          <i /> Region <b>Europe</b>
        </span>
        <span>
          <i /> Signal <b>Expansion</b>
        </span>
      </div>
    </div>
  );
}

export function ActVisual() {
  return (
    <div className="stage-visual act-visual" aria-hidden="true">
      <div className="signal-card">
        <span className="mono-label">OPPORTUNITY SIGNAL</span>
        <b>New regional activity</b>
        <small>3 supporting sources</small>
      </div>
      <div className="action-orbit">
        <i>↗</i>
      </div>
    </div>
  );
}
