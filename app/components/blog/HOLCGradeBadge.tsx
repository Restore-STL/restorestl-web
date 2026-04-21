import type { HOLCGrade } from '@/app/lib/blog-types';

interface HOLCGradeBadgeProps {
  grade: HOLCGrade;
  showTooltip?: boolean;
}

const GRADE_META: Record<HOLCGrade, { bg: string; fg: string; label: string }> = {
  A: { bg: '#10B981', fg: '#022c22', label: 'Best — historically favored for investment' },
  B: { bg: '#2563EB', fg: '#fff', label: 'Still desirable — broadly investable' },
  C: { bg: '#D97706', fg: '#0F172A', label: 'Definitely declining — limited 1930s financing' },
  D: { bg: '#DC2626', fg: '#fff', label: 'Hazardous — redlined in 1930s HOLC maps' },
};

export default function HOLCGradeBadge({ grade, showTooltip = true }: HOLCGradeBadgeProps) {
  const meta = GRADE_META[grade];
  const ariaLabel = `HOLC grade ${grade}: ${meta.label}`;
  return (
    <span
      title={showTooltip ? meta.label : undefined}
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: meta.bg,
        color: meta.fg,
        fontFamily: 'var(--font-heading)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '4px 9px',
        borderRadius: 4,
        lineHeight: 1,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 13 }}>◆</span>
      <span>HOLC {grade}</span>
    </span>
  );
}
