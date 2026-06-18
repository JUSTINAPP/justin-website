import { NextRequest } from 'next/server';
import { getGiftByToken } from '@/lib/get-gift';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return Response.json({ error: 'Missing token' }, { status: 400 });
  }

  const gift = await getGiftByToken(token);

  if (!gift) {
    return Response.json({ error: 'Gift not found' }, { status: 404 });
  }

  return Response.json(gift, {
    headers: {
      'Cache-Control': 'private, no-store',
    },
  });
}
