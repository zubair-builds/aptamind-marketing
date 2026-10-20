import type { MetadataRoute } from 'next';
import { absoluteUrl, isIndexableDeployment } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: absoluteUrl('/sitemap.xml').href,
  };
}
