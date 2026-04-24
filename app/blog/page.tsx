import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import NewsletterBand from '@/app/components/blog/NewsletterBand';
import PillarBadge from '@/app/components/blog/PillarBadge';
import { getAllPosts } from '@/app/lib/blog';
import { PILLARS, type PillarSlug } from '@/app/lib/blog-types';

export const revalidate = 3600;

export const metadata = {
  title: 'The STL Read | Restore STL',
  description:
    'Neighborhood deep dives, market data, and homeowner answers from the team at Restore STL. Rooted in local expertise.',
  alternates: { canonical: 'https://restorestl.com/blog' },
  openGraph: {
    title: 'The STL Read | Restore STL',
    description:
      'Neighborhood deep dives, market data, and homeowner answers from the team at Restore STL.',
    url: 'https://restorestl.com/blog',
    type: 'website',
  },
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('T')[0].split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>;
}) {
  const { pillar } = await searchParams;
  const activePillar = PILLARS.find((p) => p.slug === pillar)?.slug;
  const posts = getAllPosts({ includeDrafts: false });
  const filtered = activePillar
    ? posts.filter((p) => p.frontmatter.pillar === activePillar)
    : posts;

  return (
    <>
      <Navigation />
      <main style={{ background: '#fff', color: 'var(--ink)' }}>
        <section
          style={{
            background: 'var(--charcoal-mid)',
            color: '#fff',
            padding: '80px 24px 64px',
          }}
        >
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--brand-yellow)',
                margin: '0 0 16px',
              }}
            >
              The STL Read
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 4vw + 1rem, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.015em',
                color: '#fff',
                margin: 0,
                lineHeight: 1.1,
                maxWidth: 720,
              }}
            >
              Neighborhood deep dives, market data, and homeowner answers.
            </h1>
            <p
              style={{
                color: 'rgba(226,232,240,0.85)',
                fontSize: 18,
                lineHeight: 1.6,
                margin: '20px 0 0',
                maxWidth: 640,
              }}
            >
              Twenty years of St. Louis real estate experience, distilled into posts you can actually use.
            </p>
          </div>
        </section>

        <nav
          aria-label="Filter posts by topic"
          style={{
            borderBottom: '1px solid var(--surface-border)',
            background: '#fff',
            position: 'sticky',
            top: 64,
            zIndex: 20,
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: '0 auto',
              padding: '16px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <Link
              href="/blog"
              aria-current={!activePillar ? 'page' : undefined}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                color: 'var(--ink)',
                background: !activePillar ? 'var(--ink)' : 'transparent',
                border: '1px solid var(--surface-border)',
                ...(!activePillar ? { color: '#fff', borderColor: 'var(--ink)' } : {}),
              }}
            >
              All
            </Link>
            {PILLARS.map((p) => {
              const isActive = activePillar === p.slug;
              return (
                <Link
                  key={p.slug}
                  href={`/blog?pillar=${p.slug}`}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? '#fff' : 'var(--ink)',
                    background: isActive ? p.color : 'transparent',
                    border: '1px solid ' + (isActive ? p.color : 'var(--surface-border)'),
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isActive ? '#fff' : p.color,
                    }}
                  />
                  {p.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px 80px' }}>
          {filtered.length === 0 ? (
            <p style={{ color: 'var(--ink-3)', fontSize: 16, textAlign: 'center', padding: '60px 0' }}>
              No posts yet in this topic. Check back soon.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 28,
              }}
            >
              {filtered.map((post) => (
                <article
                  key={post.slug}
                  style={{
                    border: '1px solid var(--surface-border)',
                    borderRadius: 14,
                    overflow: 'hidden',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 180ms ease, box-shadow 180ms ease',
                  }}
                >
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div
                      style={{
                        aspectRatio: '16 / 10',
                        background: 'var(--surface-alt)',
                        backgroundImage: `url(${post.frontmatter.hero_image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                      }}
                      role="img"
                      aria-label={post.frontmatter.hero_alt}
                    >
                      {post.frontmatter.pillar && (
                        <div style={{ position: 'absolute', top: 12, left: 12 }}>
                          <PillarBadge pillar={post.frontmatter.pillar as PillarSlug} size="sm" />
                        </div>
                      )}
                    </div>
                  </Link>
                  <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 20,
                        fontWeight: 700,
                        color: 'var(--ink)',
                        margin: '0 0 10px',
                        lineHeight: 1.3,
                      }}
                    >
                      <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {post.frontmatter.title}
                      </Link>
                    </h2>
                    <p
                      style={{
                        color: 'var(--ink-2)',
                        fontSize: 15,
                        lineHeight: 1.55,
                        margin: '0 0 16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.frontmatter.description}
                    </p>
                    <div style={{ marginTop: 'auto', color: 'var(--ink-3)', fontSize: 13 }}>
                      {formatDate(post.frontmatter.published_at)} · {post.readMinutes} min read
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <NewsletterBand variant="index" />
      </main>
      <Footer />
    </>
  );
}
