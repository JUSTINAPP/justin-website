import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'A voice message, just for you';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// No dynamic data needed — image is the same for all valid gift tokens.
// The personalised sender name lives only in the og:title (generateMetadata).

export default async function Image() {
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
        {/* Illustration — right side */}
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

        {/* Subtitle only — sender name lives in the og:title, not the image */}
        <span
          style={{
            position: 'absolute',
            bottom: 72,
            left: 80,
            color: 'rgba(255,255,255,0.75)',
            fontSize: 36,
          }}
        >
          A little voice message, just for you.
        </span>
      </div>
    ),
    { ...size }
  );
}
