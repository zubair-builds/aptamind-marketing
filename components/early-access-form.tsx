'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowIcon } from './brand';

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
  fields?: Record<string, string[]>;
};

const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export function EarlyAccessForm() {
  const startedAt = useRef(Date.now());
  const successRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<FormState>({ status: 'idle' });

  useEffect(() => {
    if (state.status === 'success') successRef.current?.focus();
  }, [state.status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const emailField = formElement.elements.namedItem('email');
    if (emailField instanceof HTMLInputElement && !emailField.validity.valid) {
      const message = emailField.validity.valueMissing
        ? 'Enter your work email address.'
        : 'Enter a valid email address.';
      setState({
        status: 'error',
        message: 'Check the highlighted field and try again.',
        fields: { email: [message] },
      });
      emailField.focus();
      return;
    }
    setState({ status: 'submitting' });
    const form = new FormData(formElement);
    const query = new URLSearchParams(window.location.search);
    const attribution = Object.fromEntries(
      attributionKeys.flatMap((key) => {
        const value = query.get(key);
        return value ? [[key, value]] : [];
      }),
    );
    const payload = {
      email: form.get('email'),
      role: form.get('role'),
      company: form.get('company'),
      useCase: form.get('useCase') || undefined,
      marketingConsent: form.get('marketingConsent') === 'on',
      website: form.get('website'),
      startedAt: startedAt.current,
      attribution: Object.keys(attribution).length ? attribution : undefined,
    };

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fields?: Record<string, string[]>;
      };
      if (!response.ok || !result.ok) {
        setState({
          status: 'error',
          message: result.message ?? 'Something went wrong. Please try again.',
          fields: result.fields,
        });
        return;
      }
      formElement.reset();
      setState({ status: 'success', message: result.message });
    } catch {
      setState({ status: 'error', message: 'We could not connect. Check your network and try again.' });
    }
  }

  if (state.status === 'success') {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
        <span className="success-check" aria-hidden="true">
          ✓
        </span>
        <p className="form-kicker">Request received</p>
        <h3>You&apos;re on the early-access list.</h3>
        <p>{state.message} We&apos;ll be in touch when there&apos;s a relevant opening.</p>
      </div>
    );
  }

  const errorFor = (name: string) => state.fields?.[name]?.[0];

  return (
    <form className="access-form" onSubmit={submit} noValidate aria-busy={state.status === 'submitting'}>
      <div className="form-row form-row-email">
        <label htmlFor="email">Work email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          maxLength={254}
          required
          aria-invalid={Boolean(errorFor('email'))}
          aria-describedby={errorFor('email') ? 'email-error' : undefined}
        />
        {errorFor('email') && (
          <span className="field-error" id="email-error">
            {errorFor('email')}
          </span>
        )}
      </div>
      <div className="form-split">
        <div className="form-row">
          <label htmlFor="role">
            Your role <span>Optional</span>
          </label>
          <input
            id="role"
            name="role"
            type="text"
            autoComplete="organization-title"
            placeholder="e.g. Strategy lead"
            maxLength={120}
          />
        </div>
        <div className="form-row">
          <label htmlFor="company">
            Company <span>Optional</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            maxLength={160}
          />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="useCase">
          What would you use Aptamind for? <span>Optional</span>
        </label>
        <div className="select-wrap">
          <select id="useCase" name="useCase" defaultValue="">
            <option value="">Choose an area</option>
            <option value="company-sales">Company and sales intelligence</option>
            <option value="market-competitive">Market and competitive intelligence</option>
            <option value="opportunity-discovery">Opportunity discovery</option>
            <option value="something-else">Something else</option>
          </select>
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input name="marketingConsent" type="checkbox" />
        <span className="custom-checkbox" aria-hidden="true" />
        <span>Keep me informed about Aptamind product news and early-access updates. Optional.</span>
      </label>
      <button
        className="button button-light submit-button"
        type="submit"
        disabled={state.status === 'submitting'}
      >
        {state.status === 'submitting' ? 'Sending request…' : 'Request Early Access'}
        {state.status !== 'submitting' && <ArrowIcon />}
      </button>
      <p className="form-note">
        By submitting, you agree to our <a href="/privacy">Privacy notice</a>. Product updates are opt-in
        only.
      </p>
      <div className="form-status" role="alert" aria-live="polite">
        {state.status === 'error' && state.message}
      </div>
    </form>
  );
}
