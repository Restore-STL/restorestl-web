import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/app/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base: MetadataRoute.Sitemap = [
    { url: 'https://restorestl.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://restorestl.com/sell', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://restorestl.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://restorestl.com/book', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://restorestl.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://restorestl.com/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const posts = getAllPosts({ includeDrafts: false }).map((p) => ({
    url: `https://restorestl.com/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.updated_at ?? p.frontmatter.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...base, ...posts];
}
