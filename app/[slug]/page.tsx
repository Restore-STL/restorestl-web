import { existsSync } from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getNeighborhoodDetail,
  listNeighborhoodSlugs,
} from '@/app/lib/api/knowledge';
import {
  Hero,
  JumpNav,
  StatsStrip,
  IllustratedMap,
  Story,
  Houses,
  GracefulPlaceholder,
  Sources,
  NeighborhoodCTA,
} from '@/app/components/neighborhood';
import NewsletterBand from '@/app/components/blog/NewsletterBand';
import type {
  Citation,
  KnowledgeChunk,
  KnowledgeSource,
  NeighborhoodProfile,
} from '@/app/lib/neighborhood-types';
import { sourceKey } from '@/app/lib/neighborhood-types';
import { getNeighborhoodContent } from '@/app/data/lafayette-square';

export const revalidate = 3600;

const SITE_URL = 'https://restorestl.com';
const FALLBACK_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// Runtime short-circuit: if someone hits a reserved top-level slug directly,
// skip the API fetch and 404 fast. Static file-system routes (/blog, /book,
// etc.) are resolved by Next.js before this dynamic segment ever runs — the
// set below is a belt-and-suspenders guard and keeps latency down if the
// dynamic route ever gets invoked with one of these names.
const RESERVED_SLUGS = new Set([
  'about', 'blog', 'book', 'capital', 'join', 'privacy', 'sell',
  'api', '_next', 'favicon.ico', 'robots.txt', 'sitemap.xml',
]);

// Strip HTML tags + collapse whitespace from a chunk body so it's safe to use
// in meta description / JSON-LD strings. Chunk bodies are authored prose and
// may contain footnote anchors, em-dashes, and the occasional inline tag.
function cleanChunkText(body: string): string {
  return body.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd() + '…';
}

function buildDescription(
  neighborhood: NeighborhoodProfile,
  storyChunks: KnowledgeChunk[],
  maxLen: number,
): string {
  const first = storyChunks[0];
  if (first?.body) return truncate(cleanChunkText(first.body), maxLen);
  const zip = neighborhood.zips[0] ?? '';
  const zipClause = zip ? ` in ${zip}` : '';
  return truncate(
    `Neighborhood guide for ${neighborhood.display_name} in St. Louis. History, architecture, and community${zipClause}.`,
    maxLen,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) return {};
  const detail = await getNeighborhoodDetail(slug);
  if (!detail) return {};
  const { neighborhood, chunks_by_topic } = detail;
  const storyChunks: KnowledgeChunk[] = chunks_by_topic['re-history'] ?? [];
  const url = `${SITE_URL}/${slug}`;
  const title = `${neighborhood.display_name} | St. Louis Neighborhood Guide | Restore STL`;
  const description = buildDescription(neighborhood, storyChunks, 155);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Restore STL',
      images: [{ url: FALLBACK_OG_IMAGE, width: 1200, height: 630 }],
      authors: ['Restore STL'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [FALLBACK_OG_IMAGE],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await listNeighborhoodSlugs();
  // Intentionally NOT filtering reserved slugs here — a collision should be
  // loud, not silent. Next.js route priority resolves static segments first.
  return slugs.map((slug) => ({ slug }));
}

export default async function NeighborhoodHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();

  const detail = await getNeighborhoodDetail(slug);
  if (!detail) notFound();

  const { neighborhood, chunks_by_topic } = detail;
  const content = getNeighborhoodContent(slug);

  // Story = all re-history chunks; Houses = all architecture chunks.
  const storyChunks: KnowledgeChunk[] = chunks_by_topic['re-history'] ?? [];
  const housesChunks: KnowledgeChunk[] = chunks_by_topic['architecture'] ?? [];

  // Page-wide citation accumulator shared across Story + Houses.
  const citations: Citation[] = [];
  const citationIndex = new Map<string, number>();
  function registerCitation(src: KnowledgeSource): number {
    const key = sourceKey(src);
    const existing = citationIndex.get(key);
    if (existing) return existing;
    const n = citations.length + 1;
    citationIndex.set(key, n);
    citations.push({ n, ...src });
    return n;
  }

  // Map PNG existence check at build time — graceful fallback when missing.
  const mapPath = path.join(process.cwd(), 'public', 'neighborhoods', `${slug}-map.png`);
  const mapAvailable = existsSync(mapPath);

  const fallbackTagline = neighborhood.signature_trait
    ? `${neighborhood.signature_trait}.`
    : `${neighborhood.display_name} — a St. Louis neighborhood worth knowing.`;
  const tagline = content?.heroTagline ?? fallbackTagline;
  const footprintLabel = content?.footprintLabel;

  const jumpSections = [
    { id: 'map', num: '01', label: 'The Shape' },
    { id: 'story', num: '02', label: 'The Story' },
    { id: 'houses', num: '03', label: 'The Houses' },
    { id: 'whats-next', num: '04', label: "What's Next" },
    { id: 'sources', num: '05', label: 'Sources' },
  ];

  const statsStripItems = content?.statsStrip ?? [];
  const placeholders = content?.placeholders ?? [];

  const pageUrl = `${SITE_URL}/${slug}`;
  const jsonLdDescription = buildDescription(neighborhood, storyChunks, 300);
  const placeSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: neighborhood.display_name,
    description: jsonLdDescription,
    url: pageUrl,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'St. Louis, MO',
    },
  };
  const postalCode = neighborhood.zips[0];
  if (postalCode) {
    placeSchema.address = {
      '@type': 'PostalAddress',
      postalCode,
      addressLocality: 'St. Louis',
      addressRegion: 'MO',
      addressCountry: 'US',
    };
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <Hero
        displayName={neighborhood.display_name}
        tagline={tagline}
        zipCode={neighborhood.zips[0] ?? ''}
        cityOrCounty={neighborhood.city_or_county}
        footprintLabel={footprintLabel}
      />
      <JumpNav sections={jumpSections} />
      {statsStripItems.length >= 4 && (
        <StatsStrip
          items={statsStripItems}
          ariaLabel={`${neighborhood.display_name} by the place`}
        />
      )}
      <IllustratedMap
        slug={slug}
        displayName={neighborhood.display_name}
        heading={content?.mapHeading ?? `The shape of ${neighborhood.display_name}.`}
        eyebrow={content?.mapEyebrow}
        alt={content?.mapAlt ?? `Illustrated map of ${neighborhood.display_name}, St. Louis.`}
        mapAvailable={mapAvailable}
      />
      <Story chunks={storyChunks} registerCitation={registerCitation} />
      <Houses chunks={housesChunks} registerCitation={registerCitation} />

      {placeholders.length > 0 && (
        <section
          id="whats-next"
          aria-label="Sections in progress"
          style={{ padding: '72px 24px 32px', background: '#fff' }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 32, maxWidth: 720 }}>
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
                What&apos;s next · In progress
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 17,
                  color: 'var(--ink-2)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Five sections we&apos;re building carefully, one research batch at a time. Each begins with what we already know is true, and asks you — as a reader, resident, or neighbor — to help us make it sharper.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 20,
              }}
            >
              {placeholders.map((p) => (
                <GracefulPlaceholder
                  key={p.num}
                  num={p.num}
                  title={p.title}
                  fact={p.fact}
                  working={p.working}
                  microCta={p.microCta}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Sources citations={citations} />
      <NeighborhoodCTA displayName={neighborhood.display_name} />
      <NewsletterBand variant="post" />
    </main>
  );
}
