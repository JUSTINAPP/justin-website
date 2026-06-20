import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getGiftByToken } from '@/lib/get-gift';

export const alt = 'A voice message, just for you';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-dynamic';

export default async function Image({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let senderFirstName = 'Someone';
  try {
    const gift = await getGiftByToken(token);
    if (gift) senderFirstName = gift.senderName.split(' ')[0];
  } catch {
    // fall through to generic
  }

  // Load illustration as base64 — Satori/ImageResponse requires data URIs
  // for local assets. public/ is available on-disk in both local dev and Vercel.
  const illustrationData = await readFile(
    join(process.cwd(), 'public/assets/justin-hand-with-flower-illustration-white.png')
  );
  const illustrationSrc = `data:image/png;base64,${illustrationData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(160deg, #2b1d3a 0%, #4a2c47 35%, #8a4a5a 65%, #d98a6a 100%)',
          position: 'relative',
        }}
      >
        {/* Illustration — right side, 1000×1000 source shown at 360×360 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={illustrationSrc}
          width={360}
          height={360}
          style={{ position: 'absolute', right: 60, bottom: 0 }}
          alt=""
        />

        {/* Wordmark — top left */}
        <div style={{ display: 'flex', position: 'absolute', top: 60, left: 80 }}>
          <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: 44, fontWeight: 700 }}>
            just
          </span>
          <span style={{ color: '#d98a6a', fontSize: 44, fontWeight: 700 }}>
            in
          </span>
        </div>

        {/* Main text — bottom left, capped at 700px to stay clear of illustration */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            bottom: 72,
            left: 80,
            maxWidth: 700,
          }}
        >
          {/* Name and "made you something." on separate lines to handle long names */}
          <span
            style={{
              color: 'white',
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {senderFirstName}
          </span>
          <span
            style={{
              color: 'white',
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            made you something.
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 28,
              marginTop: 18,
            }}
          >
            A little voice message, just for you.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
