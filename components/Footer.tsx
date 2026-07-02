import ShareButton from './ShareButton';

export default function Footer() {
  return (
    <footer style={{ background: '#241c33' }} className="py-10">
      <div
        className="wrap"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}
      >
        {/* Wordmark */}
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.5px', lineHeight: 1 }}>
          <span style={{ color: 'white' }}>just</span>
          <span style={{ color: '#C4849A' }}>in</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
          <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          <span>·</span>
          <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
          <span>·</span>
          <a href="mailto:justintimetouch@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
            justintimetouch@gmail.com
          </a>
        </div>

        {/* Tagline */}
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontStyle: 'italic', margin: 0 }}>
          Just in case. Just in time. Just in touch.
        </p>

        {/* Share */}
        <ShareButton />
      </div>
    </footer>
  );
}
