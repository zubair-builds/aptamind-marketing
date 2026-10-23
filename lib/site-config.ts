const readUrl = (value: string | undefined) => {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : undefined;
  } catch {
    return undefined;
  }
};

export const publicSiteUrl = readUrl(process.env.PUBLIC_SITE_URL);
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined;
export const googleAnalyticsMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.match(
  /^G-[A-Z0-9]+$/i,
)
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  : undefined;
export const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;
export const isIndexableDeployment = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production';

export function absoluteUrl(path = '/') {
  return new URL(path, publicSiteUrl ?? new URL('http://localhost:3001'));
}
