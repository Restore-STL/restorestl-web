interface PostMetaProps {
  publishedAt: string;
  readMinutes: number;
  author: string;
  variant?: 'hero' | 'card';
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('T')[0].split('-').map(Number);
  const local = new Date(y, (m ?? 1) - 1, d ?? 1);
  return local.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function PostMeta({
  publishedAt,
  readMinutes,
  author,
  variant = 'hero',
}: PostMetaProps) {
  const onDark = variant === 'hero';
  const color = onDark ? 'rgba(226,232,240,0.85)' : 'var(--ink-3)';
  const dotColor = onDark ? 'rgba(148,163,184,0.7)' : 'var(--ink-3)';
  const byColor = onDark ? '#fff' : 'var(--ink)';

  return (
    <div
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 12,
        fontSize: 14,
        color,
        fontFamily: 'var(--font-body)',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Published {formatDate(publishedAt)}
      </span>
      <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: '50%', background: dotColor }} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        {readMinutes} min read
      </span>
      <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: '50%', background: dotColor }} />
      <span style={{ color: byColor, fontWeight: 500 }}>By {author}</span>
    </div>
  );
}
