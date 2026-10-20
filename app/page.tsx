import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { EarlyAccess } from '@/components/sections/early-access';
import { FAQ } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Problem } from '@/components/sections/problem';
import { Trust } from '@/components/sections/trust';
import { UseCases } from '@/components/sections/use-cases';
import { absoluteUrl } from '@/lib/site-config';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aptamind',
  url: absoluteUrl('/').href,
  description:
    'Aptamind turns scattered records, evidence, and market signals into one traceable operating picture.',
  publisher: {
    '@type': 'Organization',
    name: 'Aptamind',
    url: absoluteUrl('/').href,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <HowItWorks />
        <UseCases />
        <Trust />
        <EarlyAccess />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
