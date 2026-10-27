const faqs = [
  [
    'What is Aptamind?',
    'Aptamind is a connected intelligence platform. It turns fragmented records, evidence, and signals into a traceable operating picture, then surfaces what deserves attention.',
  ],
  [
    'Who is it for?',
    'It is for teams whose decisions depend on scattered, changing information: company and sales intelligence, market research, opportunity discovery, and adjacent workflows.',
  ],
];

export function FAQ() {
  return (
    <section className="section faq-section">
      <div className="shell faq-shell">
        <div>
          <h2>Built around real intelligence work.</h2>
          <p>We&apos;re refining Aptamind with teams that feel the cost of fragmented context every day.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {question}
                <i aria-hidden="true">+</i>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
