interface StatsStripItem {
  num: string;
  unit?: string;
  label: string;
  note: string;
}

interface StatsStripProps {
  items: readonly StatsStripItem[];
  ariaLabel: string;
}

export default function StatsStrip({ items, ariaLabel }: StatsStripProps) {
  return (
    <section
      aria-label={ariaLabel}
      style={{
        background: '#fff',
        borderBottom: '1px solid var(--surface-border)',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
        }}
      >
        {items.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 3vw + 1rem, 48px)',
                fontWeight: 800,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {s.num}
              {s.unit && (
                <span
                  style={{
                    fontSize: '0.45em',
                    fontWeight: 600,
                    marginLeft: 6,
                    color: 'var(--ink-3)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {s.unit}
                </span>
              )}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--ink)',
                marginTop: 4,
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--ink-3)',
                lineHeight: 1.5,
              }}
            >
              {s.note}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
