import Image from 'next/image';

export default function FramingBand() {
  return (
    <section style={{ background: 'white' }} className="py-14 md:py-16">
      <div className="wrap text-center">
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          {/* Illustration — dark ink on white */}
          <Image
            src="/assets/justin-hand-with-flower-illustration.png"
            alt=""
            width={1000}
            height={1000}
            style={{ width: 90, height: 'auto', margin: '0 auto 22px' }}
          />
          <p
            style={{
              fontSize: 12,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#C4849A',
              fontWeight: 700,
              margin: '0 0 14px',
            }}
          >
            A message, when it&apos;s needed most
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 800,
              letterSpacing: '-0.8px',
              color: '#2e2540',
              margin: '0 0 14px',
              lineHeight: 1.15,
            }}
          >
            More than a text. A moment.
          </h2>
          <p style={{ fontSize: 17, color: '#7a7185', lineHeight: 1.7, margin: 0 }}>
            A voice over the photos you&apos;ve shared. Gentle, personal, kept for exactly
            the right time.
          </p>
        </div>
      </div>
    </section>
  );
}
