import { ActVisual, ConnectVisual, EnrichVisual, UnderstandVisual } from '../visuals/process-visuals';

const stages = [
  {
    number: '01',
    title: 'Connect',
    copy: 'Bring records, files, and signals into one working context.',
    Visual: ConnectVisual,
  },
  {
    number: '02',
    title: 'Understand',
    copy: 'Resolve entities, duplicates, and conflicting facts.',
    Visual: UnderstandVisual,
  },
  {
    number: '03',
    title: 'Enrich',
    copy: 'Add structured context while keeping the supporting evidence visible.',
    Visual: EnrichVisual,
  },
  {
    number: '04',
    title: 'Act',
    copy: 'Surface the signals, opportunities, and decisions worth investigating.',
    Visual: ActVisual,
  },
];

export function HowItWorks() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="shell">
        <div className="section-intro split-intro">
          <p className="section-number">02 / How it works</p>
          <div>
            <h2>
              From scattered inputs <span>to an intelligence layer your team can use.</span>
            </h2>
            <p>
              Aptamind preserves the path from raw evidence to resolved context, then surfaces what deserves
              attention.
            </p>
          </div>
        </div>
        <div className="stage-grid">
          {stages.map(({ number, title, copy, Visual }) => (
            <article className={`stage-card stage-${number}`} key={number}>
              <div className="stage-meta">
                <span>{number}</span>
                <i />
              </div>
              <Visual />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <p className="direction-note">
          <span>Product direction</span> A working model we&apos;re refining with early design partners.
        </p>
      </div>
    </section>
  );
}
