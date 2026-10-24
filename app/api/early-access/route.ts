import { getSubmitDependencies, submitEarlyAccess } from '@/lib/waitlist/service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    return await submitEarlyAccess(request, await getSubmitDependencies());
  } catch (error) {
    console.error('Early access configuration or submission error:', error);
    return Response.json(
      { ok: false, message: 'Early access is not configured yet. Please try again later.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
