'use client';

import { useState } from 'react';

const SHARE_DATA = {
  title: 'Justin',
  text: "I found this: a way to leave the people you love a gift of your voice 💛",
  url: 'https://www.justinapp.com.au',
};

function ShareIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

type Props = {
  style?: React.CSSProperties;
  className?: string;
};

export default function ShareButton({ style, className }: Props) {
  const [label, setLabel] = useState('Share');

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(SHARE_DATA);
      } catch {
        // user cancelled — ignore
      }
    } else {
      // Desktop fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(SHARE_DATA.url);
        setLabel('Link copied!');
        setTimeout(() => setLabel('Share'), 2200);
      } catch {
        // clipboard blocked — do nothing
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.45)',
        fontSize: 13,
        fontFamily: 'inherit',
        fontWeight: 500,
        padding: 0,
        transition: 'color 150ms ease',
        ...style,
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
    >
      <ShareIcon />
      {label}
    </button>
  );
}
