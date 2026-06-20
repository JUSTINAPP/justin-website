'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { GiftData } from '@/lib/get-gift';

function recordOpen(token: string) {
  // Fire-and-forget: never blocks playback, never throws to the caller.
  fetch(`/api/gift/${token}/opened`, { method: 'POST' })
    .then(res => console.log('[GiftPlayer] open recorded, status:', res.status))
    .catch(err => console.warn('[GiftPlayer] open recording failed (non-fatal):', err));
}

// Waveform bar idle heights (px) — looks like a voice waveform at rest
const IDLE_H = [10, 19, 30, 14, 36, 24, 11, 32, 17, 27, 10];
const MAX_H = 36;

const PHOTO_INTERVAL_MS = 4000;
const APP_STORE_URL = 'https://apps.apple.com/au/app/justin/id1597447761';
const GRADIENT = 'linear-gradient(172deg, #2b1d3a 0%, #4a2c47 28%, #8a4a5a 62%, #d98a6a 100%)';


export default function GiftPlayer({ gift, token }: { gift: GiftData; token: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasLoggedOpen = useRef(false); // fires recordOpen exactly once per session
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Record the open on the first real play — not on page load (could be a link-preview
  // crawler or accidental tap). useRef guard ensures we call it at most once.
  useEffect(() => {
    if (!isPlaying || hasLoggedOpen.current) return;
    hasLoggedOpen.current = true;
    recordOpen(token);
  }, [isPlaying, token]);

  const message = gift.messages[0];
  const allPhotos = gift.messages.flatMap((m) => m.photoUrls);
  const caption = gift.messages.find((m) => m.caption)?.caption ?? null;
  const { moreGiftsCount, senderName } = gift;
  const senderFirstName = senderName.split(' ')[0];

  const pillCopy = moreGiftsCount > 0
    ? `${senderFirstName} left you ${moreGiftsCount} more ${moreGiftsCount === 1 ? 'message' : 'messages'}`
    : `${senderFirstName} may send you more on Justin`;

  useEffect(() => {
    if (!isPlaying || allPhotos.length <= 1) return;
    const id = setInterval(
      () => setPhotoIndex((i) => (i + 1) % allPhotos.length),
      PHOTO_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [isPlaying, allPhotos.length]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      await audio.play();
    }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        height: '100dvh',
        background: GRADIENT,
        backgroundSize: '100% 180%',
        animation: 'gradient-drift 10s ease-in-out infinite',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <audio
        ref={audioRef}
        src={message.voiceUrl}
        preload="metadata"
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (audioRef.current) audioRef.current.currentTime = 0;
        }}
      />

      {/* Centered content column — gradient fills full viewport behind it */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>

      {/* ── TOP: sender identity ──────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, textAlign: 'center', padding: '48px 24px 16px' }}>
        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          A message from
        </p>
        <p style={{ color: 'white', fontSize: 28, fontWeight: 500, lineHeight: 1.2, margin: 0 }}>
          {senderName}
        </p>
      </div>

      {/* ── MIDDLE: scrollable player content ────────────────────────────── */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 24px 20px',
        gap: 20,
      }}>

        {/* Waveform bars — bottom-aligned so they grow upward */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: MAX_H, flexShrink: 0 }}>
          {IDLE_H.map((idleH, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: isPlaying ? MAX_H : idleH,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.78)',
                transformOrigin: 'bottom',
                animation: isPlaying
                  ? `gift-waveform ${0.7 + (i % 3) * 0.11}s ease-in-out ${(i * -0.07).toFixed(2)}s infinite`
                  : 'none',
                transition: 'height 0.45s ease',
              }}
            />
          ))}
        </div>

        {/* Play / Pause — white circle, dark icon */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'white',
            border: 'none',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 6px 32px rgba(0,0,0,0.38)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
          }}
        >
          {isPlaying ? (
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect x="5" y="3" width="5" height="20" rx="2" fill="#2b1d3a" />
              <rect x="16" y="3" width="5" height="20" rx="2" fill="#2b1d3a" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M9 4.5l14 8.5-14 8.5V4.5z" fill="#2b1d3a" />
            </svg>
          )}
        </button>

        {/* Progress bar + time */}
        <div style={{ width: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ position: 'relative', width: '100%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0,
              height: 3, borderRadius: 2,
              background: 'rgba(255,255,255,0.75)',
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              transition: 'width 0.1s linear',
            }} />
            <input
              type="range" min={0} max={duration || 1} step={0.1} value={currentTime}
              onChange={handleSeek}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', margin: 0 }}
            />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 13, fontVariantNumeric: 'tabular-nums', textAlign: 'center', margin: 0 }}>
            {fmt(currentTime)}{duration > 0 ? ` / ${fmt(duration)}` : ''}
          </p>
        </div>

        {/* Photos — bounded square, cross-fades */}
        {allPhotos.length > 0 && (
          <div style={{ position: 'relative', width: 120, height: 120, borderRadius: 14, overflow: 'hidden', flexShrink: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.35)' }}>
            {allPhotos.map((url, i) => (
              <div key={url} style={{ position: 'absolute', inset: 0, opacity: i === photoIndex ? 1 : 0, transition: 'opacity 1.2s ease' }}>
                <Image src={url} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
            ))}
          </div>
        )}

        {/* Caption */}
        {caption && (
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 17, fontStyle: 'italic', lineHeight: 1.55, textAlign: 'center', margin: 0 }}>
            {caption}
          </p>
        )}
      </div>

      {/* ── BOTTOM: hook + CTA — pinned, always above fold ───────────────── */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px 28px', gap: 12 }}>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 2 }} />

        {/* More messages pill — always present */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 50,
          padding: '7px 14px',
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
            <rect x="0.6" y="2.6" width="11.8" height="7.8" rx="1.4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
            <path d="M0.6 4.5l5.9 3.3 5.9-3.3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500 }}>
            {pillCopy}
          </span>
        </div>

        {/* App Store CTA — centered, capped width, PNG Apple logo */}
        <a
          href={APP_STORE_URL}
          style={{
            alignSelf: 'center',
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            maxWidth: 320,
            width: '100%',
            background: 'white',
            borderRadius: 16,
            padding: '12px 24px',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
          }}
        >
          {/*
            The PNG is 1536×864 (landscape) with transparent padding around
            the black logo. height:32 / width:auto renders it at ~57px wide;
            the visible logo is ~26px tall. Transparent padding blends into
            the white button, so the logo sits crisp with no extra clipping needed.
          */}
          <Image
            src="/Apple-Logo-1536x864.png"
            alt=""
            width={1536}
            height={864}
            style={{ height: 32, width: 'auto', display: 'block', flexShrink: 0 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ color: 'rgba(43,29,58,0.5)', fontSize: 11, fontWeight: 400, whiteSpace: 'nowrap' }}>
              Get the app to hear them all
            </span>
            <span style={{ color: '#2b1d3a', fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap' }}>
              Download Justin
            </span>
          </div>
        </a>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0, textAlign: 'center' }}>
          Free on iPhone
        </p>
      </div>

      </div>{/* end centered content column */}
    </div>
  );
}
