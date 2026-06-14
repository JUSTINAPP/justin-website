import KenBurnsDemo from './KenBurnsDemo';

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
            Just in case · Just in time · Just in touch
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
            Give someone you love<br className="hidden md:block" /> a gift of your voice.
          </h1>

          <p style={{ fontSize: 17, color: '#7a7185', maxWidth: 420, lineHeight: 1.65, margin: 0 }}>
            Justin lets you record voice messages for the people who matter, then choose
            when they open. On a birthday. A hard day. Or whenever they need to hear you.
          </p>

          <div className="mt-2">
            <a
              href="https://apps.apple.com/au/app/justin/id1597447761"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Download the app
            </a>
          </div>
        </div>

        {/* Right — phone frame with Ken Burns demo */}
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
                borderRadius: 34,
                overflow: 'hidden',
              }}
            >
              <KenBurnsDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
