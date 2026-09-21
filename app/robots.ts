import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/birthday/'],
    },
    sitemap: 'https://www.wishmaker.sbs/sitemap.xml',
  };
}
