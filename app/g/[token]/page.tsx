import type { Metadata } from 'next';
import { getGiftByToken } from '@/lib/get-gift';
import GiftPlayer from './GiftPlayer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const gift = await getGiftByToken(token);
  if (!gift) return { title: 'Gift not found — Justin' };
  return {
    title: `A voice gift from ${gift.senderName} — Justin`,
    description: 'Someone sent you a voice gift. Open it.',
  };
}

export default async function GiftPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  console.log('[GiftPage] route hit, token:', token);
  const gift = await getGiftByToken(token);
  console.log('[GiftPage] getGiftByToken result:', gift ? `found (id=${gift.id})` : 'null');

  if (!gift) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{
          background:
            'linear-gradient(to bottom, #4A3B6B 0%, #7B6BA8 38%, #C4849A 70%, #E8B48A 100%)',
        }}
      >
        <p className="text-4xl mb-4">&#128140;</p>
        <h1 className="text-white text-xl font-semibold mb-2">
          This gift couldn&rsquo;t be found
        </h1>
        <p className="text-white/60 text-sm max-w-xs">
          The link may have expired or the gift may have been removed.
        </p>
      </div>
    );
  }

  return <GiftPlayer gift={gift} />;
}
