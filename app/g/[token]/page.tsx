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

  if (!gift) {
    return {
      title: 'A voice message — Justin',
      openGraph: { title: 'A voice message for you', description: 'Open it on Justin.' },
      twitter: { card: 'summary_large_image', title: 'A voice message for you', description: 'Open it on Justin.' },
    };
  }

  const firstName = gift.senderName.split(' ')[0];
  const title = `${firstName} made you something`;
  const description = 'A little voice message, just for you.';

  return {
    title: `${title} — Justin`,
    description,
    // Explicitly set og: fields so they override the root layout's generic values.
    // og:image is handled automatically by opengraph-image.tsx in this segment.
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function GiftPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const gift = await getGiftByToken(token);

  if (!gift) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{
          background:
            'linear-gradient(172deg, #2b1d3a 0%, #4a2c47 28%, #8a4a5a 62%, #d98a6a 100%)',
          height: '100dvh',
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
