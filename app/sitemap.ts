import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://restorestl.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://restorestl.com/sell', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://restorestl.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://restorestl.com/book', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://restorestl.com/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
