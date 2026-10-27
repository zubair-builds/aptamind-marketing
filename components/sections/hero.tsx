import { ArrowIcon } from '../brand';
import { ProductPreview } from '../visuals/product-preview';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span /> Aptamind / Connected intelligence
          </p>
          <h1>
            A clearer operating picture, <em>assembled from every source.</em>
          </h1>
          <p className="hero-lede">
            Aptamind turns scattered records, evidence, and market signals into one traceable view your team
            can investigate and act on.
          </p>
          <div className="hero-actions">
            <a className="button button-accent" href="#early-access">
              Request Early Access <ArrowIcon />
            </a>
            <a className="text-link" href="#platform">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <aside className="hero-brief" aria-label="Aptamind product summary">
          <div className="brief-heading">
            <span>System overview</span>
            <span>Private preview</span>
          </div>
          <p>Scattered inputs become a living, evidence-backed picture of what matters now.</p>
          <dl>
            <div>
              <dt>Connect</dt>
              <dd>Files, records, signals</dd>
            </div>
            <div>
              <dt>Resolve</dt>
              <dd>Entities, conflicts, changes</dd>
            </div>
            <div>
              <dt>Surface</dt>
              <dd>Context worth investigating</dd>
            </div>
          </dl>
          <div className="brief-foot">
            <span className="brief-pulse" aria-hidden="true" />
            Every insight keeps its evidence
          </div>
        </aside>
      </div>
      <div className="shell preview-wrap">
        <div className="preview-caption">
          <span>Product direction / 01</span>
          <p>Follow information from source to resolved record to decision-ready signal.</p>
        </div>
        <ProductPreview />
      </div>
    </section>
  );
}
