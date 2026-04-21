import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/app/lib/blog';
import { listNeighborhoodSlugs } from '@/app/lib/api/knowledge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: 'https://restorestl.com', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: 'https://restorestl.com/sell', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://restorestl.com/about', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://restorestl.com/book', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://restorestl.com/blog', lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://restorestl.com/privacy', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const posts = getAllPosts({ includeDrafts: false }).map((p) => ({
    url: `https://restorestl.com/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.updated_at ?? p.frontmatter.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Neighborhood hubs: per-slug lastmod is not exposed by the knowledge API,
  // so we use build time. ISR (1h) keeps the surface fresh between rebuilds.
  const neighborhoodSlugs = await listNeighborhoodSlugs();
  const neighborhoods = neighborhoodSlugs.map((slug) => ({
    url: `https://restorestl.com/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...base, ...posts, ...neighborhoods];
}
