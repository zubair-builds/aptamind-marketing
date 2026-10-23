import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { GeistSans } from 'geist/font/sans';
import { GoogleAnalytics } from './google-analytics';
import {
  absoluteUrl,
  googleSiteVerification,
  isIndexableDeployment,
} from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: absoluteUrl('/'),
  title: { default: 'Aptamind | Intelligence you can act on', template: '%s | Aptamind' },
  description:
    'Aptamind turns scattered records, evidence, and market signals into one traceable operating picture.',
  applicationName: 'Aptamind',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Aptamind | Intelligence you can act on',
    description: 'Connected intelligence your team can investigate and act on.',
    siteName: 'Aptamind',
    url: '/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Aptamind: connected intelligence with evidence attached.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aptamind | Intelligence you can act on',
    description: 'Connected intelligence your team can investigate and act on.',
    images: ['/opengraph-image'],
  },
  robots: isIndexableDeployment
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true, nosnippet: true },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5F6F1',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
