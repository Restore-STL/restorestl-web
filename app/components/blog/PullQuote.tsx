interface PullQuoteProps {
  children?: React.ReactNode;
  by?: string;
  role?: string;
}

export default function PullQuote({ children, by, role }: PullQuoteProps) {
  return (
    <blockquote
      style={{
        position: 'relative',
        margin: '40px 0',
        padding: '36px 40px 36px 80px',
        background: 'var(--surface-alt)',
        borderLeft: '4px solid var(--brand-yellow)',
        borderRadius: '0 10px 10px 0',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 4,
          left: 20,
          fontFamily: 'var(--font-heading)',
          fontSize: 96,
          lineHeight: 1,
          color: 'var(--brand-yellow)',
          fontWeight: 900,
        }}
      >
        &ldquo;
      </span>
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 500,
          fontSize: 'clamp(19px, 1.2vw + 0.9rem, 22px)',
          lineHeight: 1.4,
          color: 'var(--ink)',
        }}
      >
        {children}
      </div>
      {by && (
        <cite
          style={{
            display: 'block',
            marginTop: 18,
            fontStyle: 'normal',
            fontSize: 14,
            color: 'var(--ink-3)',
          }}
        >
          <span style={{ color: 'var(--ink-2)', fontWeight: 600 }}>{by}</span>
          {role && <> · {role}</>}
        </cite>
      )}
    </blockquote>
  );
}
