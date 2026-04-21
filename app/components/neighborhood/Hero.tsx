interface HeroProps {
  displayName: string;
  tagline: string;
  zipCode: string;
  cityOrCounty: 'city' | 'county';
  footprintLabel?: string;
}

export default function Hero({
  displayName,
  tagline,
  zipCode,
  cityOrCounty,
  footprintLabel,
}: HeroProps) {
  const cityLabel = cityOrCounty === 'city' ? 'St. Louis City' : 'St. Louis County';
  return (
    <section
      aria-labelledby="neighborhood-name"
      style={{
        background: 'var(--charcoal-deep)',
        color: '#fff',
        padding: '88px 24px 72px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            color: 'var(--brand-yellow)',
            fontFamily: 'var(--font-heading)',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          <span
            aria-hidden="true"
            style={{ width: 40, height: 2, background: 'var(--brand-yellow)' }}
          />
          Neighborhood · St. Louis
        </div>
        <h1
          id="neighborhood-name"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(44px, 6vw + 0.5rem, 96px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#fff',
            margin: '0 0 28px',
            lineHeight: 1.02,
          }}
        >
          {displayName}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(18px, 1.2vw + 0.6rem, 22px)',
            lineHeight: 1.55,
            color: 'rgba(226,232,240,0.92)',
            margin: '0 0 32px',
            maxWidth: 820,
          }}
        >
          {tagline}
        </p>
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 14,
            fontSize: 15,
            color: 'rgba(226,232,240,0.75)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              padding: '4px 10px',
              border: '1px solid rgba(226,232,240,0.35)',
              borderRadius: 4,
              fontSize: 13,
              letterSpacing: '0.05em',
              color: '#fff',
            }}
          >
            {zipCode}
          </span>
          <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(148,163,184,0.6)' }} />
          <span>{cityLabel}</span>
          {footprintLabel && (
            <>
              <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(148,163,184,0.6)' }} />
              <span>{footprintLabel}</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
