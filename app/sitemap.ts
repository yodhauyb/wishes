import { MetadataRoute } from 'next';
import { WISH_PAGES } from '@/lib/wishes-data';

const BASE = 'https://wishmaker.sbs';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE}/wishes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...WISH_PAGES.map((p) => ({
      url: `${BASE}/wishes/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
