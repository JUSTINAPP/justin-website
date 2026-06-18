'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { GiftData } from '@/lib/get-gift';

const BARS = 11;
const PHOTO_INTERVAL_MS = 4000;

export default function GiftPlayer({ gift }: { gift: GiftData }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const message = gift.messages[0];
  const allPhotos = gift.messages.flatMap((m) => m.photoUrls);
  const caption = gift.messages.find((m) => m.caption)?.caption ?? null;

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

  const initials = gift.senderName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const progress = duration ? currentTime / duration : 0;

  return (
    <div
      className="relative min-h-dvh flex flex-col items-center overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, #4A3B6B 0%, #7B6BA8 38%, #C4849A 70%, #E8B48A 100%)',
      }}
    >
      {/* Hidden audio element */}
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

      {/* Photo background — soft overlay, cross-fades while playing */}
      {allPhotos.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {allPhotos.map((url, i) => (
            <div
              key={url}
              className="absolute inset-0 transition-opacity duration-1500"
              style={{ opacity: i === photoIndex ? 0.2 : 0 }}
            >
              <Image src={url} alt="" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs px-6 flex-1">

        {/* Sender */}
        <div className="mt-16 flex flex-col items-center gap-2">
          {gift.senderAvatarUrl ? (
            <Image
              src={gift.senderAvatarUrl}
              alt={gift.senderName}
              width={72}
              height={72}
              className="rounded-full object-cover"
              style={{ boxShadow: '0 0 0 3px rgba(255,255,255,0.3)' }}
              unoptimized
            />
          ) : (
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 72,
                height: 72,
                background: gift.senderAvatarColor ?? 'rgba(255,255,255,0.2)',
                boxShadow: '0 0 0 3px rgba(255,255,255,0.3)',
              }}
            >
              <span className="text-white text-xl font-semibold">{initials}</span>
            </div>
          )}
          <p className="text-white/60 text-xs tracking-widest uppercase mt-1">from</p>
          <p className="text-white text-2xl font-semibold -mt-1">{gift.senderName}</p>
        </div>

        {/* Player area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-10 w-full py-10">

          {/* Waveform */}
          <div className="flex items-center gap-[3px]" style={{ height: 40 }}>
            {Array.from({ length: BARS }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: 24,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.75)',
                  transformOrigin: 'center',
                  animation: isPlaying
                    ? `gift-waveform 0.85s ease-in-out ${(i * -0.08).toFixed(2)}s infinite`
                    : 'none',
                  transform: isPlaying ? undefined : 'scaleY(0.25)',
                  transition: 'transform 0.4s ease',
                }}
              />
            ))}
          </div>

          {/* Play / Pause button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)',
              border: '2px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')
            }
          >
            {isPlaying ? (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="white">
                <rect x="5" y="3" width="5" height="20" rx="2" />
                <rect x="16" y="3" width="5" height="20" rx="2" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="white">
                <path d="M7 3l17 10L7 23V3z" />
              </svg>
            )}
          </button>

          {/* Progress */}
          <div className="w-full flex flex-col gap-2">
            <div className="relative w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <div
                className="absolute top-0 left-0 h-1 rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: 'rgba(255,255,255,0.85)',
                  transition: 'width 0.1s linear',
                }}
              />
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ margin: 0 }}
              />
            </div>
            <div
              className="flex justify-between text-xs"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              <span>{fmt(currentTime)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>
        </div>

        {/* Caption / words */}
        {caption && (
          <div
            className="w-full mb-6 rounded-2xl px-5 py-4"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}
            >
              {caption}
            </p>
          </div>
        )}
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-xs px-6 pb-14 flex flex-col items-center">

        {/* Divider */}
        <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.18)', marginBottom: 36 }} />

        {/* Sender attribution — warm, personal */}
        <p
          className="text-center"
          style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, fontWeight: 500, lineHeight: 1.55, marginBottom: 10 }}
        >
          {gift.senderName} made this for you on Justin.
        </p>

        {/* Invitation copy */}
        <p
          className="text-center"
          style={{ color: 'rgba(255,255,255,0.48)', fontSize: 14, lineHeight: 1.65, maxWidth: 248, marginBottom: 32 }}
        >
          Keep it forever, and send your own voice gift to someone you love.
        </p>

        {/*
          App Store button.
          TODO: replace href="#" with the real App Store URL when the app is live,
          e.g. https://apps.apple.com/au/app/justin/id000000000
        */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            background: 'rgba(255,255,255,0.93)',
            color: '#2e2540',
            padding: '13px 26px',
            borderRadius: 100,
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          }}
        >
          {/* Apple logo */}
          <svg width="17" height="21" viewBox="0 0 814 1000" fill="#2e2540" aria-hidden>
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 405.1 18.4 343 7 293.7c-1-4.1-1.6-8.4-1.6-12.8 0-5.8.6-11.6 1.6-17.2 38.1-161.5 204.5-233.9 284.3-233.9 64.4 0 118.5 41 158.8 41 38.4 0 98.6-43 170.3-43 27.4 0 130.4 2.6 198.9 88.1l.8 1zm-234.3-170.6c31.1-36.9 53.1-88.1 53.1-139.3 0-7.2-.6-14.3-1.9-21.1-52.6 2-115 35.1-148.8 72.3-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.5 1.9 18 3.2.6 8.4 1.3 13.6 1.3 47.8 0 109.3-31.8 137.2-66.7z" />
          </svg>
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontSize: 10, color: 'rgba(46,37,64,0.55)', fontWeight: 500 }}>Download on the</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>App Store</div>
          </div>
        </a>

        <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: 12, marginTop: 12 }}>
          Free on iPhone
        </p>

        {/* Made with Justin wordmark */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 40, color: 'rgba(255,255,255,0.30)', fontSize: 12 }}
        >
          <span>Made with</span>
          <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.45)' }}>just</span>
          <span style={{ fontWeight: 700, color: 'rgba(244,184,204,0.48)' }}>in</span>
        </div>

      </div>
    </div>
  );
}
