interface IllustratedMapProps {
  slug: string;
  displayName: string;
  heading: string;
  eyebrow?: string;
  alt: string;
  mapAvailable: boolean;
}

export default function IllustratedMap({
  slug,
  displayName,
  heading,
  eyebrow = 'Section 01 · The Shape of the Place',
  alt,
  mapAvailable,
}: IllustratedMapProps) {
  return (
    <section
      id="map"
      aria-label={`${displayName} illustrated neighborhood map`}
      style={{
        background: 'var(--surface-warm)',
        borderTop: '1px solid var(--warm-border)',
        borderBottom: '1px solid var(--warm-border)',
        padding: '72px 24px',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              marginBottom: 14,
            }}
          >
            {eyebrow}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 2vw + 0.6rem, 32px)',
              fontWeight: 700,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              maxWidth: 720,
              marginInline: 'auto',
            }}
          >
            {heading}
          </h2>
        </div>

        {mapAvailable ? (
          <figure style={{ margin: 0 }}>
            <img
              src={`/neighborhoods/${slug}-map.png`}
              alt={alt}
              loading="lazy"
              style={{
                display: 'block',
                width: '100%',
                maxWidth: 900,
                margin: '0 auto',
                borderRadius: 12,
              }}
            />
            <figcaption
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--ink-3)',
                marginTop: 18,
                fontStyle: 'italic',
              }}
            >
              Illustration by Restore STL. Schematic — not to survey scale.
            </figcaption>
          </figure>
        ) : (
          <div
            role="img"
            aria-label={`${displayName} illustrated map — in production`}
            style={{
              maxWidth: 900,
              margin: '0 auto',
              aspectRatio: '16 / 9',
              background: 'var(--surface-warm-deep)',
              border: '1px dashed var(--warm-border)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--ink-2)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Illustrated map in production
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: 'var(--ink-2)',
                margin: 0,
                maxWidth: 520,
                lineHeight: 1.55,
              }}
            >
              A hand-illustrated map of {displayName} is being drawn. It will replace this card when ready.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
