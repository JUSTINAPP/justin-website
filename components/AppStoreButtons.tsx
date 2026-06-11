function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M3.18 23.76c.37.21.8.24 1.2.1l12.44-12.44-2.64-2.64L3.18 23.76zM20.77 10.34l-2.65-1.53-2.96 2.96 2.96 2.96 2.67-1.54c.76-.44.76-1.42-.02-1.85zM1.88.25C1.63.52 1.5.92 1.5 1.42v21.17c0 .5.14.9.4 1.17l.06.06L13.44 12 1.96.19l-.08.06zM14.43 6.9L3.38.32c-.4-.23-.79-.27-1.1-.1l11 11L14.43 6.9z" />
    </svg>
  );
}

export default function AppStoreButtons({ centered = false }: { centered?: boolean }) {
  const wrapperClass = `flex flex-col sm:flex-row gap-3 ${centered ? 'justify-center' : ''}`;
  return (
    <div className={wrapperClass}>
      <a
        href="https://apps.apple.com/au/app/justin/id1597447761"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-900 transition-colors"
      >
        <AppleIcon />
        <div className="text-left leading-tight">
          <div className="text-[10px] text-white/70">Download on the</div>
          <div className="text-sm font-semibold">App Store</div>
        </div>
      </a>
      <a
        href="/coming-soon"
        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-900 transition-colors"
      >
        <PlayIcon />
        <div className="text-left leading-tight">
          <div className="text-[10px] text-white/70">Get it on</div>
          <div className="text-sm font-semibold">Google Play</div>
        </div>
      </a>
    </div>
  );
}
