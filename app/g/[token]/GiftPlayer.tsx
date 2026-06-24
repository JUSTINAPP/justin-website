'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { GiftData } from '@/lib/get-gift';

function recordOpen(token: string) {
  fetch(`/api/gift/${token}/opened`, { method: 'POST' })
    .then(res => console.log('[GiftPlayer] open recorded, status:', res.status))
    .catch(err => console.warn('[GiftPlayer] open recording failed (non-fatal):', err));
}

const IDLE_H         = [10, 19, 30, 14, 36, 24, 11, 32, 17, 27, 10];
const MAX_H          = 36;
const PHOTO_ADVANCE  = 3000;   // ms each photo holds
const PHOTO_FADE     = 1000;   // ms crossfade
const APP_STORE_URL  = 'https://apps.apple.com/au/app/justin/id1597447761';
const BRAND_PURPLE   = '#7B6BA8';
// Scrim: darker at top (sender name) and bottom (CTA), lighter in middle
const SCRIM = 'linear-gradient(to bottom, rgba(20,15,30,0.55) 0%, rgba(20,15,30,0.18) 36%, rgba(20,15,30,0.18) 62%, rgba(20,15,30,0.88) 100%)';

export default function GiftPlayer({ gift, token }: { gift: GiftData; token: string }) {
  const audioRef         = useRef<HTMLAudioElement>(null);
  const hasLoggedOpen    = useRef(false);
  const slideshowStarted = useRef(false);
  const slideshowTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying,   setIsPlaying]   = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [photoIndex,  setPhotoIndex]  = useState(0);
  const [codeCopied,  setCodeCopied]  = useState(false);

  const message         = gift.messages[0];
  const allPhotos       = gift.messages.flatMap(m => m.photoUrls);
  const caption         = gift.messages.find(m => m.caption)?.caption ?? null;
  const { senderName, claimCode } = gift;
  const senderFirstName = senderName.split(' ')[0];
  const hasVoice        = !!message?.voiceUrl;
  const hasPhotos       = allPhotos.length > 0;
  const hasMultiPhotos  = allPhotos.length > 1;

  // ── Record first play ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || hasLoggedOpen.current) return;
    hasLoggedOpen.current = true;
    recordOpen(token);
  }, [isPlaying, token]);

  // ── Photo slideshow — starts on first play, runs independently of audio ───
  useEffect(() => {
    if (!isPlaying || !hasMultiPhotos || slideshowStarted.current) return;
    slideshowStarted.current = true;
    const n = allPhotos.length;
    let i = 0;
    function step() {
      i++;
      setPhotoIndex(Math.min(i, n - 1));
      if (i < n - 1) slideshowTimer.current = setTimeout(step, PHOTO_ADVANCE);
    }
    slideshowTimer.current = setTimeout(step, PHOTO_ADVANCE);
  }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

  // Unmount cleanup
  useEffect(() => () => {
    if (slideshowTimer.current) clearTimeout(slideshowTimer.current);
  }, []);

  // ── Claim code copy ────────────────────────────────────────────────────────
  const copyCode = useCallback(() => {
    if (!claimCode) return;
    navigator.clipboard.writeText(claimCode).then(() => {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }).catch(() => {});
  }, [claimCode]);

  // ── Audio controls ─────────────────────────────────────────────────────────
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { await audio.play(); }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden', background: BRAND_PURPLE }}>

      {/* ── Background: first photo full-bleed, or brand-purple above ─────── */}
      {hasPhotos && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {allPhotos.map((url, i) => (
            <div
              key={url}
              style={{
                position: 'absolute', inset: 0,
                opacity: i === photoIndex ? 1 : 0,
                transition: `opacity ${PHOTO_FADE}ms ease`,
              }}
            >
              <Image src={url} alt="" fill style={{ objectFit: 'cover' }} unoptimized priority={i === 0} />
            </div>
          ))}
        </div>
      )}

      {/* ── Gradient scrim — always, ensures text legibility over any photo ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: SCRIM }} />

      {/* ── Audio element (only when voice present) ───────────────────────── */}
      {hasVoice && (
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
      )}

      {/* ── Content column ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%', display: 'flex', flexDirection: 'column',
        width: '100%', maxWidth: 440, marginLeft: 'auto', marginRight: 'auto',
      }}>

        {/* TOP: sender identity */}
        <div style={{ flexShrink: 0, textAlign: 'center', padding: '48px 24px 0' }}>
          <p style={{
            color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: 6, textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}>
            A message from
          </p>
          <p style={{
            color: 'white', fontSize: 22, fontWeight: 500, lineHeight: 1.2,
            margin: 0, textShadow: '0 1px 6px rgba(0,0,0,0.5)',
          }}>
            {senderName}
          </p>
        </div>

        {/* MIDDLE: player controls (if voice) + caption (if present) */}
        <div style={{
          flex: 1, minHeight: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 18, padding: '20px 24px 0',
        }}>

          {/* Voice controls — omitted entirely for state 4 (no voice) */}
          {hasVoice && (
            <>
              {/* Waveform bars — animate only while playing */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: MAX_H, flexShrink: 0 }}>
                {IDLE_H.map((idleH, i) => (
                  <div key={i} style={{
                    width: 3,
                    height: isPlaying ? MAX_H : idleH,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.78)',
                    transformOrigin: 'bottom',
                    animation: isPlaying
                      ? `gift-waveform ${0.7 + (i % 3) * 0.11}s ease-in-out ${(i * -0.07).toFixed(2)}s infinite`
                      : 'none',
                    transition: 'height 0.45s ease',
                  }} />
                ))}
              </div>

              {/* Play / Pause button */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'white', border: 'none', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                  e.currentTarget.style.boxShadow = '0 6px 32px rgba(0,0,0,0.38)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
                }}
              >
                {isPlaying ? (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <rect x="5"  y="3" width="5" height="20" rx="2" fill="#2b1d3a" />
                    <rect x="16" y="3" width="5" height="20" rx="2" fill="#2b1d3a" />
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M9 4.5l14 8.5-14 8.5V4.5z" fill="#2b1d3a" />
                  </svg>
                )}
              </button>

              {/* Progress bar + time */}
              <div style={{ width: '100%', flexShrink: 0 }}>
                <div style={{ position: 'relative', width: '100%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }}>
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
                <p style={{
                  color: 'rgba(255,255,255,0.48)', fontSize: 13,
                  fontVariantNumeric: 'tabular-nums', textAlign: 'center', margin: '8px 0 0',
                }}>
                  {fmt(currentTime)}{duration > 0 ? ` / ${fmt(duration)}` : ''}
                </p>
              </div>
            </>
          )}

          {/* Caption — Plus Jakarta Sans, not italic, text-shadow for legibility */}
          {caption && (
            <p style={{
              color: 'white',
              fontSize: 17,
              fontWeight: 400,
              letterSpacing: '0.015em',
              lineHeight: 1.55,
              textAlign: 'center',
              margin: 0,
              textShadow: '0 1px 8px rgba(0,0,0,0.7)',
              padding: '0 4px',
            }}>
              {caption}
            </p>
          )}
        </div>

        {/* Photo progress dots — above CTA, only when multiple photos */}
        {hasMultiPhotos && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, padding: '12px 0 4px' }}>
            {allPhotos.map((_, i) => (
              <div key={i} style={{
                height: 6,
                width: i === photoIndex ? 18 : 6,
                borderRadius: 3,
                background: i === photoIndex ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.32)',
                transition: 'all 0.35s ease',
              }} />
            ))}
          </div>
        )}

        {/* BOTTOM: CTA stack */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 24px 28px', gap: 10 }}>

          {/* "[Sender] may send you more on Justin" */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden>
              <rect x="0.6" y="2.6" width="11.8" height="7.8" rx="1.4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
              <path d="M0.6 4.5l5.9 3.3 5.9-3.3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>
              {senderFirstName} may send you more on Justin
            </span>
          </div>

          {/* Download button — inline-flex so it sizes to content, not full-width */}
          <a
            href={APP_STORE_URL}
            style={{
              display: 'inline-flex', flexDirection: 'row',
              alignItems: 'center', gap: 10,
              background: 'white', borderRadius: 14,
              padding: '11px 22px', textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            <Image
              src="/Apple-Logo-1536x864.png"
              alt="" width={1536} height={864}
              style={{ height: 28, width: 'auto', display: 'block', flexShrink: 0 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ color: 'rgba(46,37,64,0.45)', fontSize: 9, fontWeight: 400, whiteSpace: 'nowrap' }}>
                Free on iPhone
              </span>
              <span style={{ color: '#2e2540', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>
                Download Justin
              </span>
            </div>
          </a>

          {/* Gift code — instruction + prominent monospaced code, tap to copy */}
          {claimCode && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <p style={{
                color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 400,
                textAlign: 'center', margin: 0, lineHeight: 1.4,
              }}>
                Download Justin, then enter this code to find your gift:
              </p>
              <button
                onClick={copyCode}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.28)',
                  borderRadius: 10,
                  cursor: 'pointer',
                  padding: '10px 18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  color: 'white', fontSize: 22, fontWeight: 700, letterSpacing: '0.1em',
                }}>
                  {claimCode}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
                  {codeCopied ? 'Copied' : 'tap to copy'}
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
