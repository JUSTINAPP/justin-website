export default function Hero() {
  return (
    <section
      style={{ background: 'linear-gradient(180deg,#faf8fc,#f5eff6)' }}
      className="py-16 md:py-24"
    >
      <div className="wrap flex flex-col md:flex-row items-center gap-12">
        {/* Left — copy */}
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left gap-6">
          <p
            style={{
              fontSize: 12,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#C4849A',
              fontWeight: 700,
            }}
          >
            Just in case · time · touch
          </p>

          <h1
            style={{
              fontSize: 'clamp(38px, 5vw, 54px)',
              fontWeight: 800,
              letterSpacing: '-1.8px',
              lineHeight: 1.08,
              color: '#2e2540',
              margin: 0,
            }}
          >
            Something to open<br className="hidden md:block" /> when it matters most.
          </h1>

          <p style={{ fontSize: 17, color: '#7a7185', maxWidth: 420, lineHeight: 1.65, margin: 0 }}>
            Record a message for someone you love — your voice, a few photos. They open it
            on a birthday, a hard day, or whenever they need you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <a
              href="https://apps.apple.com/au/app/justin/id1597447761"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Download the app
            </a>
            <a href="/record" className="btn-ghost">
              Leave a message now
            </a>
          </div>
        </div>

        {/* Right — CSS phone mockup */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div
            style={{
              width: 256,
              height: 496,
              background: '#2e2540',
              borderRadius: 42,
              padding: 8,
              boxShadow: '0 32px 80px rgba(46,37,64,0.28), 0 0 0 0.5px rgba(46,37,64,0.12)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(170deg,#9b8ec4,#d4a0b0 58%,#e8b48a)',
                borderRadius: 34,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 22,
                padding: '0 24px',
              }}
            >
              {/* Wordmark */}
              <div style={{ fontWeight: 800, fontSize: 28, color: 'white', letterSpacing: '-0.5px' }}>
                justin
              </div>

              {/* Play button */}
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '13px solid transparent',
                    borderBottom: '13px solid transparent',
                    borderLeft: '22px solid white',
                    marginLeft: 5,
                  }}
                />
              </div>

              {/* Caption */}
              <div
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 13,
                  lineHeight: 1.55,
                  opacity: 0.92,
                }}
              >
                A message from Mum
                <br />
                opens on your birthday 🎂
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
