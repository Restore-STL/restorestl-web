import Link from 'next/link';
import { PILLARS, type PillarSlug } from '@/app/lib/blog-types';
import { getPostCountByPillar } from '@/app/lib/blog';

interface TopicExplorerProps {
  currentPillar?: PillarSlug;
}

export default function TopicExplorer({ currentPillar }: TopicExplorerProps) {
  const counts = getPostCountByPillar();
  return (
    <section
      aria-labelledby="topic-explorer-heading"
      style={{
        maxWidth: 1000,
        margin: '72px auto 0',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      <p
        id="topic-explorer-heading"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 13,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--ink-3)',
          margin: '0 0 18px',
        }}
      >
        Explore other topics
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
        }}
      >
        {PILLARS.map((p) => {
          const count = counts[p.slug] ?? 0;
          const isCurrent = currentPillar === p.slug;
          return (
            <Link
              key={p.slug}
              href={`/blog?pillar=${p.slug}`}
              aria-current={isCurrent ? 'page' : undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                borderRadius: 999,
                border: '1px solid var(--surface-border)',
                background: isCurrent ? 'var(--surface-alt)' : '#fff',
                color: 'var(--ink)',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: p.color,
                  border: p.badgeClass === 'behind' ? '1px solid var(--surface-border)' : 'none',
                }}
              />
              <span>{p.label}</span>
              <span style={{ color: 'var(--ink-3)', fontWeight: 500 }}>· {count}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
