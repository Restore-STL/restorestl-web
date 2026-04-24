import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import PostMeta from '@/app/components/blog/PostMeta';
import PillarBadge from '@/app/components/blog/PillarBadge';
import TopicExplorer from '@/app/components/blog/TopicExplorer';
import NewsletterBand from '@/app/components/blog/NewsletterBand';
import NeighborhoodCard from '@/app/components/blog/NeighborhoodCard';
import { SourcesList } from '@/app/components/blog/SourceCitation';
import { mdxComponents } from '@/app/components/blog/MDXComponents';
import { getAllSlugs, getPostBySlug } from '@/app/lib/blog';
import { validateNeighborhoodSlugs } from '@/app/lib/knowledge-client';
import type { PillarSlug } from '@/app/lib/blog-types';

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const url = `https://restorestl.com/blog/${slug}`;
  const imageUrl = fm.hero_image.startsWith('http')
    ? fm.hero_image
    : `https://restorestl.com${fm.hero_image}`;
  return {
    title: `${fm.title} | Restore STL`,
    description: fm.description,
    alternates: { canonical: url },
    openGraph: {
      title: fm.title,
      description: fm.description,
      url,
      type: 'article',
      publishedTime: fm.published_at,
      modifiedTime: fm.updated_at,
      authors: [fm.author],
      images: [{ url: imageUrl, alt: fm.hero_alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fm.title,
      description: fm.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const related = fm.related_neighborhoods ?? [];
  const { valid: validRelated } = await validateNeighborhoodSlugs(related);

  const url = `https://restorestl.com/blog/${slug}`;
  const imageUrl = fm.hero_image.startsWith('http')
    ? fm.hero_image
    : `https://restorestl.com${fm.hero_image}`;
  const articleBodyPreview = post.body
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: fm.title,
    description: fm.description,
    image: [imageUrl],
    datePublished: fm.published_at,
    dateModified: fm.updated_at ?? fm.published_at,
    author: { '@type': 'Organization', name: fm.author, url: 'https://restorestl.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Restore STL',
      url: 'https://restorestl.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://restorestl.com/apple-touch-icon.png',
      },
    },
    articleBody: articleBodyPreview,
    keywords: fm.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main style={{ background: '#fff', color: 'var(--ink)' }}>
        <section
          style={{
            background: '#000',
            color: '#fff',
            padding: '72px 24px 56px',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            {fm.pillar && (
              <div style={{ marginBottom: 22 }}>
                <PillarBadge pillar={fm.pillar as PillarSlug} />
              </div>
            )}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.2vw + 0.5rem, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.015em',
                color: '#fff',
                margin: '0 0 24px',
                lineHeight: 1.08,
              }}
            >
              {fm.title}
            </h1>
            <PostMeta
              publishedAt={fm.published_at}
              readMinutes={post.readMinutes}
              author={fm.author}
              variant="hero"
            />
          </div>
        </section>

        <article className="prose-article" style={{ padding: '56px 24px 32px' }}>
          <p style={{ fontSize: 'clamp(19px, 1.2vw + 0.8rem, 21px)', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.55 }}>
            {fm.description}
          </p>
          <MDXRemote
            source={post.body}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
              },
            }}
          />
        </article>

        {fm.sources && fm.sources.length > 0 && (
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
            <SourcesList sources={fm.sources} />
          </div>
        )}

        {validRelated.length > 0 && (
          <section
            aria-labelledby="related-heading"
            style={{
              maxWidth: 820,
              margin: '40px auto 0',
              padding: '32px 24px 0',
              borderTop: '1px solid var(--surface-border)',
            }}
          >
            <h2
              id="related-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--ink-3)',
                margin: '0 0 20px',
              }}
            >
              Explore related neighborhoods
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {validRelated.map((s) => (
                <NeighborhoodCard key={s} slug={s} />
              ))}
            </div>
          </section>
        )}

        <TopicExplorer currentPillar={fm.pillar as PillarSlug | undefined} />

        <div style={{ maxWidth: 720, margin: '64px auto 0', padding: '0 24px', textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{
              color: 'var(--ink)',
              fontSize: 14,
              fontWeight: 600,
              borderBottom: '2px solid var(--brand-yellow)',
              textDecoration: 'none',
              paddingBottom: 2,
            }}
          >
            ← All posts
          </Link>
        </div>

        <NewsletterBand variant="post" />
      </main>
      <Footer />
    </>
  );
}
