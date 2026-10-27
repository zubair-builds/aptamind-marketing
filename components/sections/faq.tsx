const faqs = [
  [
    'What is Aptamind?',
    'Aptamind is a connected intelligence platform in development. It is designed to turn fragmented records, evidence, and signals into a traceable operating picture, then surface what deserves attention.',
  ],
  [
    'Who is it for?',
    'It is for teams whose decisions depend on scattered, changing information: company and sales intelligence, market research, opportunity discovery, and adjacent workflows.',
  ],
  [
    'How does early access work?',
    'Share the problem you need to solve. We review every request and invite teams whose workflows are a strong fit for the next product stage.',
  ],
];

export function FAQ() {
  return (
    <section className="section faq-section">
      <div className="shell faq-shell">
        <div>
          <h2>Built around real intelligence work.</h2>
          <p>We're developing Aptamind with teams that feel the cost of fragmented context every day.</p>
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
