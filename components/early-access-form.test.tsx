// @vitest-environment happy-dom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EarlyAccessForm } from './early-access-form';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('EarlyAccessForm', () => {
  it('reports an invalid email before sending a request', () => {
    const request = vi.fn();
    vi.stubGlobal('fetch', request);
    render(<EarlyAccessForm />);

    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: /book a demo/i }));

    expect(screen.getByText('Enter a valid email address.')).toBeTruthy();
    expect(request).not.toHaveBeenCalled();
  });

  it('shows a focused confirmation after a successful request', async () => {
    const request = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, message: 'Thanks. Your request has been received.' }), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', request);
    render(<EarlyAccessForm />);

    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'person@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /book a demo/i }));

    const confirmation = await screen.findByRole('status');
    await waitFor(() => expect(document.activeElement).toBe(confirmation));
    expect(request).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/demo request received/i)).toBeTruthy();
  });
});
