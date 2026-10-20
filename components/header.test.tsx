// @vitest-environment happy-dom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Header } from './header';

afterEach(cleanup);

describe('Header', () => {
  it('opens, closes, and escape-dismisses the mobile navigation', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: 'Open navigation' });
    const menu = document.querySelector('#mobile-menu');

    expect(menu).toHaveProperty('hidden', true);
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Close navigation' }).getAttribute('aria-expanded')).toBe(
      'true',
    );
    expect(menu).toHaveProperty('hidden', false);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded')).toBe(
      'false',
    );
    expect(menu).toHaveProperty('hidden', true);
  });
});
