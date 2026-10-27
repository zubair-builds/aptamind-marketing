const faqs = [
  [
    'What is Aptamind?',
    'Aptamind is a connected intelligence platform. It turns fragmented records, evidence, and signals into a traceable operating picture, then surfaces what deserves attention.',
  ],
  [
    'Who is it for?',
    'It is for teams whose decisions depend on scattered, changing information: company and sales intelligence, market research, opportunity discovery, and adjacent workflows.',
  ],
  [
    'Is Aptamind available today?',
    'Aptamind is currently available by private demo. Book a walkthrough to see the platform on a real workflow. General access is not yet open.',
  ],
  [
    'How do I book a demo?',
    'Share the problem you need to solve. We review every request and schedule a demo with teams whose workflows are a strong fit.',
  ],
];

export function FAQ() {
  return (
    <section className="section faq-section">
      <div className="shell faq-shell">
        <div>
          <p className="section-number">05 / Questions</p>
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
