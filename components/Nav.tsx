export default function Nav() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f2eef7',
      }}
    >
      <div className="wrap flex items-center justify-between py-3.5">
        {/* Wordmark */}
        <a href="/" style={{ fontWeight: 800, fontSize: 26, letterSpacing: '-0.5px', textDecoration: 'none', lineHeight: 1 }}>
          <span style={{ color: '#4A3B6B' }}>just</span>
          <span style={{ color: '#C4849A' }}>in</span>
        </a>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a
            href="#how"
            className="hidden md:block"
            style={{ fontSize: 14, fontWeight: 500, color: '#7B6BA8', textDecoration: 'none' }}
          >
            How it works
          </a>
          <a
            href="https://apps.apple.com/au/app/justin/id1597447761"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#4A3B6B',
              color: 'white',
              padding: '9px 18px',
              borderRadius: 9,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}
