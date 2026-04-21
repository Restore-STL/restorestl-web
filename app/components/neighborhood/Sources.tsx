import type { Citation } from '@/app/lib/neighborhood-types';

interface SourcesProps {
  citations: Citation[];
}

export default function Sources({ citations }: SourcesProps) {
  if (citations.length === 0) return null;
  return (
    <section
      id="sources"
      aria-labelledby="sources-heading"
      style={{
        background: 'var(--surface-warm)',
        borderTop: '1px solid var(--warm-border)',
        padding: '56px 24px 48px',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h3
          id="sources-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--ink-2)',
            margin: '0 0 8px',
          }}
        >
          Sources
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--ink-2)',
            margin: '0 0 20px',
            lineHeight: 1.55,
          }}
        >
          We show our sources because this is someone&apos;s neighborhood, not just content.
        </p>
        <ol
          style={{
            margin: 0,
            paddingLeft: 24,
            color: 'var(--ink-2)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {citations.map((c) => (
            <li key={c.n} id={`src-${c.n}`} style={{ marginBottom: 10 }}>
              {c.author && <span>{c.author}. </span>}
              {c.url ? (
                <a
                  href={c.url}
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ink)', fontStyle: 'italic' }}
                >
                  {c.title}
                </a>
              ) : (
                <em>{c.title}</em>
              )}
              {c.year && <span>, {c.year}</span>}
              .
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
