import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aptamind',
    short_name: 'Aptamind',
    description: 'Intelligence you can act on.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F6F1',
    theme_color: '#174A32',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
