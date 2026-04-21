import Link from 'next/link';

interface NeighborhoodCTAProps {
  displayName: string;
}

export default function NeighborhoodCTA({ displayName }: NeighborhoodCTAProps) {
  return (
    <section
      id="feedback"
      aria-labelledby="nb-cta-heading"
      style={{
        background: 'var(--charcoal-deep)',
        color: '#fff',
        padding: '72px 24px',
      }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <h2
          id="nb-cta-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 2.4vw + 0.8rem, 38px)',
            fontWeight: 700,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          Thinking about {displayName}?{' '}
          <span style={{ color: 'var(--brand-yellow)' }}>Kevin knows this block.</span>
        </h2>
        <p
          style={{
            color: 'rgba(226,232,240,0.85)',
            fontSize: 17,
            lineHeight: 1.6,
            margin: '18px 0 32px',
            maxWidth: 640,
            marginInline: 'auto',
          }}
        >
          Buying, selling, or just figuring out what your place is worth — 15 minutes on the phone, no sales pitch.
        </p>
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            href="/book"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'var(--brand-yellow)',
              color: 'var(--charcoal-deep)',
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Schedule a 15-minute call →
          </Link>
          <Link
            href="/sell"
            style={{
              color: '#fff',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              textDecoration: 'none',
              borderBottom: '2px solid var(--brand-yellow)',
              paddingBottom: 2,
            }}
          >
            See what your home is worth →
          </Link>
        </div>
      </div>
    </section>
  );
}
