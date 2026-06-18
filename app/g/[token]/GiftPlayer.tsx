'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { GiftData } from '@/lib/get-gift';

const BARS = 11;
const PHOTO_INTERVAL_MS = 4000;
const APP_STORE_URL = 'https://apps.apple.com/au/app/justin/id1597447761';

const GRADIENT = 'linear-gradient(172deg, #2b1d3a 0%, #4a2c47 28%, #8a4a5a 62%, #d98a6a 100%)';

export default function GiftPlayer({ gift }: { gift: GiftData }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const message = gift.messages[0];
  const allPhotos = gift.messages.flatMap((m) => m.photoUrls);
  const caption = gift.messages.find((m) => m.caption)?.caption ?? null;
  const { moreGiftsCount, senderName } = gift;
  const senderFirstName = senderName.split(' ')[0];

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

  const ctaCopy = moreGiftsCount > 0
    ? 'Get the app to hear them all'
    : 'Keep this forever, and send your own';

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

      {/* ── TOP: sender identity ──────────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          textAlign: 'center',
          padding: '48px 24px 16px',
        }}
      >
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
        <p style={{
          color: 'white',
          fontSize: 28,
          fontWeight: 500,
          lineHeight: 1.2,
          margin: 0,
        }}>
          {senderName}
        </p>
      </div>

      {/* ── MIDDLE: scrollable player content ────────────────────────────── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 24px 20px',
          gap: 20,
        }}
      >
        {/* Waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 32, flexShrink: 0 }}>
          {Array.from({ length: BARS }, (_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 24,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.7)',
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

        {/* Play / Pause button — white circle, dark icon */}
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
              position: 'absolute',
              top: 0, left: 0,
              height: 3,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.75)',
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              transition: 'width 0.1s linear',
            }} />
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                margin: 0,
              }}
            />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.48)',
            fontSize: 13,
            fontVariantNumeric: 'tabular-nums',
            textAlign: 'center',
            margin: 0,
          }}>
            {fmt(currentTime)}{duration > 0 ? ` / ${fmt(duration)}` : ''}
          </p>
        </div>

        {/* Photos — bounded square, cross-fades */}
        {allPhotos.length > 0 && (
          <div style={{
            position: 'relative',
            width: 120,
            height: 120,
            borderRadius: 14,
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}>
            {allPhotos.map((url, i) => (
              <div
                key={url}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: i === photoIndex ? 1 : 0,
                  transition: 'opacity 1.2s ease',
                }}
              >
                <Image src={url} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
            ))}
          </div>
        )}

        {/* Caption */}
        {caption && (
          <p style={{
            color: 'rgba(255,255,255,0.88)',
            fontSize: 17,
            fontStyle: 'italic',
            lineHeight: 1.55,
            textAlign: 'center',
            margin: 0,
          }}>
            {caption}
          </p>
        )}
      </div>

      {/* ── BOTTOM: hook + CTA — always above fold ────────────────────────── */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px 28px',
        gap: 12,
      }}>
        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 2 }} />

        {/* More messages pill */}
        {moreGiftsCount > 0 && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 50,
            padding: '7px 14px',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="0.6" y="2.6" width="11.8" height="7.8" rx="1.4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
              <path d="M0.6 4.5l5.9 3.3 5.9-3.3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 13,
              fontWeight: 500,
            }}>
              {senderFirstName} left you {moreGiftsCount} more {moreGiftsCount === 1 ? 'message' : 'messages'}
            </span>
          </div>
        )}

        {/* App Store CTA */}
        <a
          href={APP_STORE_URL}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            width: '100%',
            background: 'white',
            borderRadius: 14,
            padding: '14px 20px',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
          }}
        >
          <span style={{ color: 'rgba(43,29,58,0.55)', fontSize: 12, fontWeight: 400 }}>
            {ctaCopy}
          </span>
          <span style={{ color: '#2b1d3a', fontSize: 17, fontWeight: 700 }}>
            Download Justin
          </span>
        </a>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, margin: 0 }}>Free on iPhone</p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, margin: 0 }}>Made with Justin</p>
        </div>
      </div>
    </div>
  );
}
