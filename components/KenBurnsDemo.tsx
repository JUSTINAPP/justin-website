/*
  Ken Burns Demo — seamless 30s loop, three photos, handwritten Caveat captions.

  Timing model (CYCLE=30s, STAGGER=10s, ACTIVE=12s):
    Photo 1:  delay 0s   → visible  0–12s, dark 12–30s
    Photo 2:  delay 10s  → visible 10–22s, dark 22–40s (loops back at 30s)
    Photo 3:  delay 20s  → visible 20–32s (crosses 30s boundary seamlessly)
  Cross-fades: 2s dissolve where consecutive photos overlap (8s–10s, 18s–20s, 28s–30s).
*/

const CYCLE   = 30;  // full loop duration
const STAGGER = 10;  // each photo starts 10s after previous

// Real photos (downloaded); warm gradients as CSS fallback if image fails to load.
const photos = [
  {
    src:      '/assets/demo/photo1.jpg',
    fallback: 'linear-gradient(165deg,#c4905c,#e8b48a,#c47a8a)',
    drift:    'kb-drift-1',
  },
  {
    src:      '/assets/demo/photo2.jpg',
    fallback: 'linear-gradient(155deg,#9b8ec4,#c4849a,#e8c0a8)',
    drift:    'kb-drift-2',
  },
  {
    src:      '/assets/demo/photo3.jpg',
    fallback: 'linear-gradient(175deg,#d4c4e8,#e8b8b8,#f0d4a8)',
    drift:    'kb-drift-3',
  },
];

// Three caption lines, one per photo slot.
const captions = [
  { text: 'Hey love —', size: 20, weight: 600 },
  {
    text: "if you're hearing this, I just wanted you\nto know how proud I am of you.",
    size: 15,
    weight: 400,
  },
  { text: "Whatever today looks like,\nI'm right here.", size: 16, weight: 400 },
];

// Waveform: 12 bars, two properties vary per bar for organic feel.
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
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {/* ── Photo layers: real image with gradient fallback ── */}
      {photos.map(({ src, fallback, drift }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            // Image on top; warm gradient shows instantly if image hasn't loaded yet.
            backgroundImage: `url('${src}'), ${fallback}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0,
            // Opacity cross-fade: linear for consistent dissolve speed.
            // Motion: ease-in-out for imperceptible start/end of drift.
            animation: [
              `kb-photo-fade ${CYCLE}s ${i * STAGGER}s linear infinite`,
              `${drift} ${CYCLE}s ${i * STAGGER}s ease-in-out infinite`,
            ].join(', '),
          }}
        />
      ))}

      {/* ── Deep scrim — concentrated at bottom where text lives ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, transparent 25%, rgba(14,7,22,0.55) 60%, rgba(14,7,22,0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Handwritten captions in Caveat ── */}
      {captions.map(({ text, size, weight }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: 72,
            left: 20,
            right: 20,
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: size,
            fontWeight: weight,
            lineHeight: 1.45,
            color: 'rgba(255,250,242,0.95)',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            opacity: 0,
            animation: `kb-caption ${CYCLE}s ${i * STAGGER}s ease-in-out infinite`,
          }}
        >
          {text}
        </div>
      ))}

      {/* ── Waveform + label ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 18,
          right: 18,
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
                background: 'rgba(255,255,255,0.38)',
                height: 6,
                animation: `${anim} ${dur}s ${delay}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-plus-jakarta-sans), system-ui, sans-serif',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 10,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            letterSpacing: '0.02em',
          }}
        >
          From Mum · 0:32
        </span>
      </div>
    </div>
  );
}
