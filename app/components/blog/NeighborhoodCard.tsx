import Link from 'next/link';
import { getNeighborhood } from '@/app/lib/knowledge-client';
import HOLCGradeBadge from './HOLCGradeBadge';
import type { HOLCGrade } from '@/app/lib/blog-types';

interface NeighborhoodCardProps {
  slug: string;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <aside
      style={{
        border: '1px solid var(--surface-border)',
        background: 'var(--surface-warm)',
        borderRadius: 14,
        padding: '24px 28px',
        margin: '32px 0',
        fontFamily: 'var(--font-body)',
      }}
    >
      {children}
    </aside>
  );
}

export default async function NeighborhoodCard({ slug }: NeighborhoodCardProps) {
  const data = await getNeighborhood(slug);

  if (!data) {
    return (
      <Shell>
        <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: 0 }}>
          Neighborhood details for <code>{slug}</code> are unavailable right now.
        </p>
      </Shell>
    );
  }

  const { detail, summary } = data;
  const holcGrade = (summary?.holc_grade ?? null) as HOLCGrade | null;
  const zips = detail.zips?.length ? detail.zips : summary?.zips ?? [];
  const tagline = detail.signature_trait ?? null;

  return (
    <Shell>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          {detail.display_name}
        </h3>
        {holcGrade && <HOLCGradeBadge grade={holcGrade} />}
      </div>
      {tagline && (
        <p style={{ color: 'var(--ink-2)', margin: '6px 0 14px', fontSize: 16, lineHeight: 1.55 }}>
          {tagline}
        </p>
      )}
      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px 24px',
          margin: 0,
          fontSize: 14,
          color: 'var(--ink-2)',
        }}
      >
        {zips.length > 0 && (
          <div>
            <dt style={{ color: 'var(--ink-2)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>ZIPs</dt>
            <dd style={{ margin: '2px 0 0', fontFamily: 'var(--font-mono)' }}>{zips.join(', ')}</dd>
          </div>
        )}
        {detail.city_or_county && (
          <div>
            <dt style={{ color: 'var(--ink-2)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Location</dt>
            <dd style={{ margin: '2px 0 0', textTransform: 'capitalize' }}>{detail.city_or_county}</dd>
          </div>
        )}
        {typeof detail.total_knowledge_chunks === 'number' && (
          <div>
            <dt style={{ color: 'var(--ink-2)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Research notes</dt>
            <dd style={{ margin: '2px 0 0' }}>{detail.total_knowledge_chunks}</dd>
          </div>
        )}
      </dl>
      <div style={{ marginTop: 16 }}>
        <Link
          href={`/neighborhoods/${detail.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--ink)',
            borderBottom: '2px solid var(--brand-yellow)',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
            paddingBottom: 1,
          }}
        >
          Learn more about {detail.display_name} →
        </Link>
      </div>
    </Shell>
  );
}
