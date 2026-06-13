type LogoProps = {
  variant?: 'full' | 'icon';
  size?: number;
  className?: string;
};

function FullWordmark({ size, className }: { size: number; className?: string }) {
  // Lay out "Just·in" in SVG so it scales perfectly at any size.
  // We use dominant-baseline / textAnchor so the SVG auto-sizes via viewBox.
  // Approximate character widths at size=40, Fraunces 600:
  //   "Just" ≈ 64px, "·" ≈ 10px, "in" ≈ 26px → total ≈ 100px
  // viewBox is fixed at 100×44; rendered size is controlled by width/height props.
  const vbW = 136;
  const vbH = 44;
  const renderedW = (size * vbW) / vbH;

  return (
    <svg
      width={renderedW}
      height={size}
      viewBox={`0 0 ${vbW} ${vbH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Justin"
      className={className}
    >
      <text
        y="36"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontWeight="600"
        fontSize="40"
        letterSpacing="-0.02em"
        fill="none"
      >
        {/* "Just" in brand-deep */}
        <tspan fill="#4A3B6B">Just</tspan>
        {/* raised dot in brand-peach */}
        <tspan fill="#E8B48A" dy="-6" fontSize="32">·</tspan>
        {/* "in" in brand-rose, drop back to baseline */}
        <tspan fill="#C4849A" dy="6" fontSize="40">in</tspan>
      </text>
    </svg>
  );
}

function IconMark({ size, className }: { size: number; className?: string }) {
  const r = size * 0.22; // border-radius ~22% of size
  // Wave: a smooth horizontal sine-like path centred in the icon
  // At size=40: wave sits in the lower half, dot above it
  const cx = size / 2;
  const waveY = size * 0.62;
  const dotY = size * 0.35;
  const amp = size * 0.10;   // wave amplitude
  const wLen = size * 0.55;  // total wave width
  const x0 = cx - wLen / 2;
  const x1 = cx + wLen / 2;
  // Cubic bezier for one full sine period: start → peak → trough → end
  const cpX = wLen / 3;
  const wavePath = `M ${x0} ${waveY} C ${x0 + cpX} ${waveY - amp * 2}, ${x1 - cpX} ${waveY + amp * 2}, ${x1} ${waveY}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Justin"
      className={className}
    >
      <defs>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#7B6BA8" />
          <stop offset="55%"  stopColor="#C4849A" />
          <stop offset="100%" stopColor="#E8B48A" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect width={size} height={size} rx={r} ry={r} fill="url(#iconGrad)" />

      {/* Small dot above the wave */}
      <circle cx={cx} cy={dotY} r={size * 0.055} fill="white" />

      {/* Calm wave line */}
      <path
        d={wavePath}
        stroke="white"
        strokeWidth={size * 0.065}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({ variant = 'full', size = 40, className }: LogoProps) {
  if (variant === 'icon') {
    return <IconMark size={size} className={className} />;
  }
  return <FullWordmark size={size} className={className} />;
}
