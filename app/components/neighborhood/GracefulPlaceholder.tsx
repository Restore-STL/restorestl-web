interface GracefulPlaceholderProps {
  num: string;
  title: string;
  fact: string;
  working: string;
  microCta: string;
  microCtaHref?: string;
}

export default function GracefulPlaceholder({
  num,
  title,
  fact,
  working,
  microCta,
  microCtaHref = '#feedback',
}: GracefulPlaceholderProps) {
  return (
    <article
      style={{
        background: '#fff',
        border: '1px solid var(--surface-border)',
        borderRadius: 14,
        padding: '26px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--ink-3)',
            letterSpacing: '0.04em',
          }}
        >
          {num} · {title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-3)',
            border: '1px solid var(--surface-border)',
            padding: '4px 9px',
            borderRadius: 999,
            whiteSpace: 'nowrap',
          }}
        >
          In progress
        </span>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--ink)',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: 'var(--ink-2)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {fact}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--ink-3)',
          lineHeight: 1.55,
          margin: 0,
          fontStyle: 'italic',
        }}
      >
        {working}
      </p>
      <a
        href={microCtaHref}
        style={{
          marginTop: 6,
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--ink)',
          borderBottom: '2px solid var(--brand-yellow)',
          textDecoration: 'none',
          alignSelf: 'flex-start',
          paddingBottom: 1,
        }}
      >
        {microCta}
      </a>
    </article>
  );
}
