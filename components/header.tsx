'use client';

import { useEffect, useState } from 'react';
import { Brand, ArrowIcon } from './brand';

const navigation = [
  { href: '#platform', label: 'Platform' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#use-cases', label: 'Use cases' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a href="#top" className="brand-link" aria-label="Aptamind home">
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button-dark nav-cta" href="#early-access">
          Request Early Access <ArrowIcon />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span> {item.label}
            </a>
          ))}
          <a className="button button-accent" href="#early-access" onClick={() => setOpen(false)}>
            Request Early Access <ArrowIcon />
          </a>
        </nav>
      </div>
    </header>
  );
}
