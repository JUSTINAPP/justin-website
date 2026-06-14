import Image from 'next/image';

export default function DownloadCTA() {
  return (
    <section id="download" style={{ background: 'white' }} className="py-20 md:py-24">
      <div className="wrap text-center">
        {/* Illustration — dark ink on white */}
        <Image
          src="/assets/justin-hands-with-star-illustration.png"
          alt=""
          width={1000}
          height={1000}
          style={{ width: 80, height: 'auto', margin: '0 auto 28px' }}
        />
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: '-1.2px',
            color: '#2e2540',
            margin: '0 0 14px',
          }}
        >
          Start with one message.
        </h2>
        <p style={{ fontSize: 17, color: '#8a8195', margin: '0 0 36px' }}>
          Pick one person. Leave them something for later. It only takes a minute.
        </p>
        <a
          href="https://apps.apple.com/au/app/justin/id1597447761"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Download the app
        </a>
      </div>
    </section>
  );
}
