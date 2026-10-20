import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/privacy', '/terms'].map((path) => ({
    url: absoluteUrl(path).href,
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : 0.3,
  }));
}
