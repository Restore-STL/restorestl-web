import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { KnowledgeChunk } from '@/app/lib/neighborhood-types';
import { CitationRefs } from './Story';

interface HousesProps {
  chunks: KnowledgeChunk[];
  registerCitation: (src: NonNullable<KnowledgeChunk['sources']>[number]) => number;
}

export default function Houses({ chunks, registerCitation }: HousesProps) {
  if (chunks.length === 0) return null;
  return (
    <section
      id="houses"
      aria-labelledby="houses-heading"
      style={{
        padding: '72px 24px 48px',
        background: 'var(--surface-alt)',
        borderTop: '1px solid var(--surface-border)',
      }}
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
            Section 03 · Architecture
          </div>
          <h2
            id="houses-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 2.4vw + 0.8rem, 40px)',
              fontWeight: 700,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            The Houses
          </h2>
        </header>

        <div className="prose-article" style={{ maxWidth: 'none' }}>
          {chunks.map((chunk) => {
            const refs = (chunk.sources ?? []).map((s) => registerCitation(s));
            return (
              <div key={chunk.id} style={{ marginBottom: 36 }}>
                {chunk.title && (
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 22,
                      fontWeight: 700,
                      color: 'var(--ink)',
                      margin: '0 0 14px',
                      lineHeight: 1.3,
                    }}
                  >
                    {chunk.title}
                  </h3>
                )}
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
