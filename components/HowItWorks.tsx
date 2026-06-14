const steps = [
  {
    number: '1',
    title: 'Record a moment',
    description: 'Your voice, a few photos. Takes a minute. No pressure to be perfect.',
  },
  {
    number: '2',
    title: 'Choose when it opens',
    description:
      "Right away, on a date that matters, or whenever they need it — like 'open when you miss me'.",
  },
  {
    number: '3',
    title: "They'll feel you there",
    description:
      "Your message arrives exactly when it should. And when they open it, you'll quietly know.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 md:py-20" style={{ background: 'white' }}>
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
                background: '#faf8fc',
                border: '1px solid #f0eaf6',
                borderRadius: 20,
                padding: '32px 26px',
              }}
            >
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
                  marginBottom: 18,
                }}
              >
                {step.number}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: '#2e2540', margin: '0 0 8px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: '#8a8195', lineHeight: 1.65, margin: 0 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
