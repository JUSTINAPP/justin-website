import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Record a message — Justin',
};

export default function RecordPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#faf8fc,#f5eff6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      {/* Wordmark */}
      <div style={{ fontWeight: 800, fontSize: 32, letterSpacing: '-0.5px', marginBottom: 40 }}>
        <span style={{ color: '#4A3B6B' }}>just</span>
        <span style={{ color: '#C4849A' }}>in</span>
      </div>

      <h1
        style={{
          fontSize: 'clamp(28px, 5vw, 36px)',
          fontWeight: 800,
          letterSpacing: '-1px',
          color: '#2e2540',
          maxWidth: 480,
          marginBottom: 16,
          lineHeight: 1.15,
        }}
      >
        Recording is coming to the web soon
      </h1>

      <p
        style={{
          fontSize: 17,
          color: '#7a7185',
          maxWidth: 380,
          marginBottom: 36,
          lineHeight: 1.65,
        }}
      >
        For now, download the app to record and send a message.
      </p>

      <a
        href="https://apps.apple.com/au/app/justin/id1597447761"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
      >
        Download the app
      </a>

      <Link
        href="/"
        style={{
          marginTop: 28,
          color: '#7B6BA8',
          fontSize: 14,
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        ← Back to home
      </Link>
    </div>
  );
}
