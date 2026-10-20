import { deploymentConfigurationIssues } from '@/lib/deployment-config';
import { checkWaitlistStorage } from '@/lib/waitlist/service';

export const dynamic = 'force-dynamic';

const healthResponse = (ok: boolean) =>
  Response.json(
    { ok },
    {
      status: ok ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  );

export async function GET() {
  if (process.env.NODE_ENV === 'production' && deploymentConfigurationIssues(process.env).length) {
    return healthResponse(false);
  }

  try {
    return healthResponse(await checkWaitlistStorage());
  } catch {
    return healthResponse(false);
  }
}
