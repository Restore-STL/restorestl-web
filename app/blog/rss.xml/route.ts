import { getAllPosts } from '@/app/lib/blog';

export const revalidate = 3600;

const SITE_URL = 'https://restorestl.com';
const FEED_TITLE = 'The STL Read — Restore STL';
const FEED_DESC =
  'Neighborhood deep dives, market data, and homeowner answers from the team at Restore STL.';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(iso: string): string {
  const [y, m, d] = iso.split('T')[0].split('-').map(Number);
  const local = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0));
  return local.toUTCString();
}

export async function GET() {
  const posts = getAllPosts({ includeDrafts: false });
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const pubDate = toRfc822(p.frontmatter.updated_at ?? p.frontmatter.published_at);
      return `    <item>
      <title>${escapeXml(p.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.frontmatter.description)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(FEED_DESC)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
