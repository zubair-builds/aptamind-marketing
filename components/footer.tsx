import { contactEmail } from '@/lib/site-config';
import { Brand } from './brand';

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <a href="#top" aria-label="Aptamind home">
            <Brand inverse />
          </a>
          <p>Turn fragmented information into evidence-backed understanding.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <a href="#platform">Platform</a>
            <a href="#how-it-works">How it works</a>
            <a href="#use-cases">Use cases</a>
          </div>
          <div>
            <span>Company</span>
            <a href="#early-access">Early access</a>
            {contactEmail && <a href={`mailto:${contactEmail}`}>Contact</a>}
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Aptamind</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
