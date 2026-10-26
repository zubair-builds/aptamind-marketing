import Script from 'next/script';
import { googleAnalyticsMeasurementId } from '@/lib/site-config';

export function GoogleAnalytics() {
  if (!googleAnalyticsMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsMeasurementId}', { anonymize_ip: true });

          try {
            const params = new URLSearchParams(window.location.search);
            if (params.get('ref') === 'cv') {
              gtag('event', 'resume_visit', { method: 'cv' });
            }
          } catch (e) {}
        `}
      </Script>
    </>
  );
}
