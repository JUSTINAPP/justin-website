const pills = [
  'Open on your birthday',
  'Open on our anniversary',
  'Open on your first day',
  'Open when you miss me',
  "Open when you can't sleep",
  "Open when it's a hard day",
  'Open when you need me',
];

export default function OpenWhen() {
  return (
    <section
      style={{ background: 'linear-gradient(160deg,#7B6BA8,#C4849A 60%,#E8B48A)' }}
      className="py-16 md:py-20"
    >
      <div className="wrap text-center">
        <h2
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-1px',
            margin: '0 0 10px',
          }}
        >
          For every moment that matters.
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', margin: '0 0 36px' }}>
          Big days and hard days alike.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
            maxWidth: 680,
            margin: '0 auto',
          }}
        >
          {pills.map((pill) => (
            <span
              key={pill}
              style={{
                background: 'white',
                color: '#7B6BA8',
                padding: '12px 22px',
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
