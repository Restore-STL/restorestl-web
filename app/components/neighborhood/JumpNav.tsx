'use client';

import { useEffect, useRef, useState } from 'react';

interface JumpNavProps {
  sections: Array<{ id: string; label: string; num: string }>;
}

export default function JumpNav({ sections }: JumpNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting),
      { rootMargin: '-65px 0px 0px 0px', threshold: 0 },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: [0, 0.1, 0.25] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  return (
    <>
      <div ref={sentinelRef} style={{ position: 'absolute', height: 1, width: 1 }} aria-hidden="true" />
      <nav
        ref={navRef}
        aria-label="Page sections"
        style={{
          position: 'sticky',
          top: 64,
          zIndex: 30,
          background: 'var(--surface-warm)',
          borderBottom: '1px solid var(--warm-border)',
          boxShadow: stuck ? '0 6px 18px -10px rgba(15,23,42,0.18)' : 'none',
          transition: 'box-shadow 180ms ease',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
            gap: 0,
            scrollbarWidth: 'none',
          }}
        >
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active ? 'true' : undefined}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '0 18px',
                  height: '100%',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--ink)' : 'var(--ink-2)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  borderBottom: active ? '2px solid var(--brand-yellow)' : '2px solid transparent',
                  transition: 'color 150ms ease',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: active ? '#7a5100' : 'var(--ink-2)',
                    letterSpacing: '0.05em',
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {s.num}
                </span>
                {s.label}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
