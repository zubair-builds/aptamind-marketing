import { Brand } from '@/components/brand';

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <a href="/" aria-label="Aptamind home">
        <Brand />
      </a>
      <div>
        <p className="section-number">404 / Not found</p>
        <h1>This page isn&apos;t connected.</h1>
        <p>The page may have moved, or the address may be incomplete.</p>
        <a className="button button-dark" href="/">
          Return home →
        </a>
      </div>
    </main>
  );
}
