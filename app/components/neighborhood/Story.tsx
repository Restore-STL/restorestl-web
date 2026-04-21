import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { Citation, KnowledgeChunk } from '@/app/lib/neighborhood-types';

interface StoryProps {
  chunks: KnowledgeChunk[];
  registerCitation: (src: NonNullable<KnowledgeChunk['sources']>[number]) => number;
}

export default function Story({ chunks, registerCitation }: StoryProps) {
  if (chunks.length === 0) return null;
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      style={{ padding: '72px 24px 48px', background: '#fff' }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <header style={{ marginBottom: 32 }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              marginBottom: 10,
            }}
          >
            Section 02 · History
          </div>
          <h2
            id="story-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 2.4vw + 0.8rem, 40px)',
              fontWeight: 700,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            The Story
          </h2>
        </header>

        <div className="prose-article" style={{ maxWidth: 'none' }}>
          {chunks.map((chunk) => {
            const refs = (chunk.sources ?? []).map((s) => registerCitation(s));
            return (
              <div key={chunk.id} style={{ marginBottom: 28 }}>
                <MDXRemote
                  source={chunk.body}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
                {refs.length > 0 && <CitationRefs nums={refs} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CitationRefs({ nums }: { nums: number[] }) {
  const unique = Array.from(new Set(nums)).sort((a, b) => a - b);
  return (
    <div style={{ marginTop: 8, fontSize: 14, color: 'var(--ink-3)' }}>
      Source{unique.length > 1 ? 's' : ''}:{' '}
      {unique.map((n, i) => (
        <span key={n}>
          {i > 0 && ' '}
          <sup style={{ fontSize: '0.8em', lineHeight: 0 }}>
            <a
              href={`#src-${n}`}
              aria-label={`Citation ${n}`}
              style={{
                color: 'var(--ink)',
                fontWeight: 600,
                padding: '0 3px',
                background: 'rgba(255,194,0,0.22)',
                borderRadius: 3,
                textDecoration: 'none',
              }}
            >
              [{n}]
            </a>
          </sup>
        </span>
      ))}
    </div>
  );
}
