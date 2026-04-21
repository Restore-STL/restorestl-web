interface SourceCitationProps {
  num: string;
  title?: string;
  url?: string;
}

export default function SourceCitation({ num, title, url }: SourceCitationProps) {
  const safeTitle = title ?? `Source ${num}`;
  return (
    <sup
      style={{
        fontSize: '0.72em',
        lineHeight: 0,
        marginLeft: 2,
      }}
    >
      <a
        href={url ?? `#source-${num}`}
        title={safeTitle}
        aria-label={`Citation ${num}: ${safeTitle}`}
        style={{
          color: 'var(--ink)',
          borderBottom: 'none',
          fontWeight: 600,
          padding: '0 3px',
          background: 'rgba(255,194,0,0.22)',
          borderRadius: 3,
          textDecoration: 'none',
        }}
      >
        [{num}]
      </a>
    </sup>
  );
}

interface SourcesListProps {
  sources: { num: string; title: string; author?: string; year?: number; url?: string }[];
}

export function SourcesList({ sources }: SourcesListProps) {
  if (sources.length === 0) return null;
  return (
    <section
      aria-labelledby="sources-heading"
      style={{
        maxWidth: 720,
        margin: '64px auto 0',
        padding: '28px 0 0',
        borderTop: '1px solid var(--surface-border)',
      }}
    >
      <h2
        id="sources-heading"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 14,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--ink-3)',
          margin: '0 0 16px',
        }}
      >
        Sources
      </h2>
      <ol style={{ margin: 0, paddingLeft: 24, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.6 }}>
        {sources.map((s) => (
          <li key={s.num} id={`source-${s.num}`} style={{ marginBottom: 8 }}>
            {s.author && <span>{s.author}. </span>}
            {s.url ? (
              <a href={s.url} style={{ color: 'var(--ink)' }}>
                {s.title}
              </a>
            ) : (
              <em>{s.title}</em>
            )}
            {s.year && <span>, {s.year}</span>}
            .
          </li>
        ))}
      </ol>
    </section>
  );
}
