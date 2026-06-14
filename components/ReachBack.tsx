import Image from 'next/image';

export default function ReachBack() {
  return (
    <section style={{ background: '#2e2540', paddingTop: 67 }} className="py-16 md:py-24">
      <div className="wrap text-center">
        {/* Illustration — white ink on dark */}
        <Image
          src="/assets/justin-huging-arms-illustration-white.png"
          alt=""
          width={1000}
          height={1000}
          style={{ width: 110, height: 'auto', margin: '0 auto 28px' }}
        />
        <p
          style={{
            fontSize: 12,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#C4849A',
            fontWeight: 700,
            margin: '0 0 18px',
          }}
        >
          The quiet difference
        </p>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.5px',
            maxWidth: 560,
            margin: '0 auto 20px',
            lineHeight: 1.15,
          }}
        >
          When they open it, you&apos;ll know.
        </h2>
        <p
          style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 540,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          The moment someone opens your message, you get a gentle nudge. A quiet sign
          that now might be the time to call, to text, to show up. Care, exactly when
          it&apos;s needed.
        </p>
      </div>
    </section>
  );
}
