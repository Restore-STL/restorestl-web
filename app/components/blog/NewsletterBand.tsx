'use client';

import { useState, type FormEvent } from 'react';

interface NewsletterBandProps {
  variant?: 'index' | 'post';
}

type State = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterBand({ variant = 'index' }: NewsletterBandProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || state === 'submitting') return;
    setState('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: variant === 'post' ? 'blog-post' : 'blog-index' }),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <section
      style={{
        background: 'var(--charcoal-deep)',
        color: '#fff',
        padding: '64px 24px',
        marginTop: variant === 'post' ? 72 : 0,
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(26px, 2vw + 1rem, 34px)',
            fontWeight: 700,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          Get the monthly{' '}
          <span style={{ color: 'var(--brand-yellow)' }}>STL</span> read.
        </h2>
        <p style={{ color: 'rgba(226,232,240,0.8)', margin: '14px 0 28px', fontSize: 16, lineHeight: 1.55 }}>
          One email a month. Neighborhood deep dives, market data, homeowner answers — no filler.
        </p>
        {state === 'success' ? (
          <p style={{ color: 'var(--brand-yellow)', fontWeight: 600, margin: 0 }}>
            Subscribed. Watch your inbox for the next issue.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
            }}
          >
            <label htmlFor="newsletter-email" style={{ position: 'absolute', left: -9999 }}>
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              style={{
                flex: '1 1 260px',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--charcoal-line)',
                background: '#1e293b',
                color: '#fff',
                fontSize: 15,
                fontFamily: 'var(--font-body)',
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              disabled={state === 'submitting'}
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--brand-yellow)',
                color: 'var(--charcoal-deep)',
                fontWeight: 700,
                fontSize: 15,
                cursor: state === 'submitting' ? 'wait' : 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              {state === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}
        {state === 'error' && (
          <p style={{ color: '#fca5a5', marginTop: 12, fontSize: 14 }}>
            Something went wrong. Try again in a moment.
          </p>
        )}
      </div>
    </section>
  );
}
