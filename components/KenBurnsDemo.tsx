/*
  Ken Burns Demo — filmic, 50s seamless loop.

  Timing: CYCLE=50s, STAGGER=10s, ACTIVE=12.5s.
  - Fade-in:  2.5s  (0–5%  of cycle)
  - Hold:     7.5s  (5–20% of cycle)
  - Fade-out: 2.5s  (20–25% of cycle)  ← overlaps with next photo fading in
  - Crossfade = ACTIVE − STAGGER = 2.5s  ← two photos coexist for 2.5s
  - KB motion: 12.5s per photo = CYCLE/4, so it resets in perfect sync every loop.

  Captions appear on photos 1, 3, 5 (delays 0, 20, 40s) — every other photo
  breathes quietly with no text.
*/

const CYCLE   = 50;   // full loop, seconds
const STAGGER = 10;   // photo N+1 starts 10s after photo N
const KB_DUR  = 12.5; // KB motion duration = ACTIVE window = CYCLE/4

const photos = [
  { src: '/assets/cooper-01.jpg', kb: 'kb-c1' },
  { src: '/assets/cooper-02.jpg', kb: 'kb-c2' },
  { src: '/assets/cooper-03.jpg', kb: 'kb-c3' },
  { src: '/assets/cooper-04.jpg', kb: 'kb-c4' },
  { src: '/assets/cooper-05.jpg', kb: 'kb-c5' },
];

// Captions on photos 1, 3, 5 — delays match photo delays (0, 20, 40s)
const captions = [
  { text: 'Happy birthday, Coop.', delay: 0,  size: 22, weight: 600 },
  { text: "I'm so proud of the\nperson you're becoming.", delay: 20, size: 17, weight: 400 },
  { text: "Whatever today brings —\nI'm always right here.", delay: 40, size: 17, weight: 400 },
];

const bars = [
  { anim: 'bar-a', dur: 0.72, delay: 0.00 },
  { anim: 'bar-b', dur: 0.56, delay: 0.08 },
  { anim: 'bar-c', dur: 0.88, delay: 0.16 },
  { anim: 'bar-d', dur: 0.62, delay: 0.24 },
  { anim: 'bar-e', dur: 0.78, delay: 0.32 },
  { anim: 'bar-f', dur: 0.52, delay: 0.40 },
  { anim: 'bar-a', dur: 0.68, delay: 0.48 },
  { anim: 'bar-c', dur: 0.84, delay: 0.56 },
  { anim: 'bar-b', dur: 0.60, delay: 0.64 },
  { anim: 'bar-e', dur: 0.74, delay: 0.72 },
  { anim: 'bar-d', dur: 0.64, delay: 0.80 },
  { anim: 'bar-f', dur: 0.90, delay: 0.88 },
];

type Props = { className?: string };

export default function KenBurnsDemo({ className }: Props) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        // Subtle cinematic grade: slight desaturation + lifted contrast
        filter: 'saturate(0.9) contrast(1.04)',
      }}
    >
      {/* ── Photo layers ── */}
      {photos.map(({ src, kb }, i) => {
        const delay = i * STAGGER;
        return (
          <div
            key={src}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${src}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',  // portrait photos: show upper portion
              opacity: 0,
              animation: [
                // Opacity cross-fade: linear so dissolve speed is consistent
                `kb-photo-fade ${CYCLE}s ${delay}s linear infinite`,
                // KB motion: ease-in-out, 12.5s, same delay
                `${kb} ${KB_DUR}s ${delay}s ease-in-out infinite`,
              ].join(', '),
            }}
          />
        );
      })}

      {/* ── Warm film overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(250, 232, 210, 0.07)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Deep scrim — only at bottom, behind text ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, transparent 38%, rgba(8,4,18,0.6) 65%, rgba(8,4,18,0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Handwritten captions in Caveat ── */}
      {captions.map(({ text, delay, size, weight }) => (
        <div
          key={delay}
          style={{
            position: 'absolute',
            bottom: 70,
            left: 18,
            right: 18,
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: size,
            fontWeight: weight,
            lineHeight: 1.4,
            color: 'rgba(255, 250, 242, 0.96)',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            letterSpacing: '0.01em',
            opacity: 0,
            animation: `kb-caption ${CYCLE}s ${delay}s ease-in-out infinite`,
          }}
        >
          {text}
        </div>
      ))}

      {/* ── Waveform + label ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {bars.map(({ anim, dur, delay }, idx) => (
            <div
              key={idx}
              style={{
                width: 2,
                borderRadius: 1.5,
                background: 'rgba(255,255,255,0.32)',
                height: 5,
                animation: `${anim} ${dur}s ${delay}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-plus-jakarta-sans), system-ui, sans-serif',
            color: 'rgba(255,255,255,0.38)',
            fontSize: 10,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            letterSpacing: '0.02em',
          }}
        >
          From Dad · 0:24
        </span>
      </div>
    </div>
  );
}
