import { PILLARS, type PillarSlug } from '@/app/lib/blog-types';

interface PillarBadgeProps {
  pillar: PillarSlug;
  size?: 'sm' | 'md';
}

export default function PillarBadge({ pillar, size = 'md' }: PillarBadgeProps) {
  const meta = PILLARS.find((p) => p.slug === pillar);
  if (!meta) return null;
  const isLight = meta.badgeClass === 'neighborhood' || meta.badgeClass === 'behind';
  const fg = isLight ? 'var(--charcoal-deep)' : '#fff';
  const padY = size === 'sm' ? 4 : 6;
  const padX = size === 'sm' ? 9 : 12;
  const fontSize = size === 'sm' ? 10 : 11;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: meta.color,
        color: fg,
        padding: `${padY}px ${padX}px`,
        borderRadius: 4,
        fontFamily: 'var(--font-heading)',
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {meta.label}
    </span>
  );
}
