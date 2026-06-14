// Icons reversed out to white for dark cards
const STROKE = {
  stroke: 'rgba(255,255,255,0.75)',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
};

function MicIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" {...STROKE}>
      <rect x="9" y="2" width="6" height="11" rx="3" {...STROKE} />
      <path d="M5 10a7 7 0 0 0 14 0" {...STROKE} />
      <line x1="12" y1="17" x2="12" y2="21" {...STROKE} />
      <line x1="9" y1="21" x2="15" y2="21" {...STROKE} />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" {...STROKE}>
      <rect x="3" y="4" width="18" height="18" rx="2" {...STROKE} />
      <line x1="16" y1="2" x2="16" y2="6" {...STROKE} />
      <line x1="8" y1="2" x2="8" y2="6" {...STROKE} />
      <line x1="3" y1="10" x2="21" y2="10" {...STROKE} />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" {...STROKE}>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        {...STROKE}
      />
    </svg>
  );
}

const steps = [
  {
    number: '1',
    icon: <MicIcon />,
    title: 'Record a moment',
    description: 'Your voice, a few photos. Takes a minute. No pressure to be perfect.',
  },
  {
    number: '2',
    icon: <CalendarIcon />,
    title: 'Choose when it opens',
    description:
      "Right away, on a date that matters, or whenever they need it — like 'open when you miss me'.",
  },
  {
    number: '3',
    icon: <HeartIcon />,
    title: "They'll feel you there",
    description:
      "Your message arrives exactly when it should. And when they open it, you'll quietly know.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 md:py-20" style={{ background: '#faf0e4' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: '-1px',
              color: '#2e2540',
              margin: '0 0 10px',
            }}
          >
            A gift you build over time.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                background: '#2e2540',
                borderRadius: 20,
                padding: '32px 26px',
                boxShadow: '0 8px 32px rgba(46,37,64,0.18)',
              }}
            >
              {/* Icon + badge row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg,#7B6BA8,#C4849A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'white',
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </div>
                {step.icon}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: 'white', margin: '0 0 8px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
