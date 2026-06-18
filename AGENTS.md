<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project context

**Site:** justinapp.com.au — Next.js 16 + Tailwind v4 + Vercel. Hosts two things:
1. The Justin app marketing site (`app/page.tsx` and components).
2. The gift "taste page" at `/g/[token]`.

## Taste page (`app/g/[token]/`)

Recipients open a share link `https://justinapp.com.au/g/{share_token}`. The page loads the gift by token and plays the voice message in the browser.

**Files:**
- `lib/supabase-server.ts` — creates the Supabase admin client (service role)
- `lib/get-gift.ts` — fetches gift + messages + sender by token; generates signed URLs
- `app/api/gift/[token]/route.ts` — JSON endpoint (same logic, for external consumers)
- `app/g/[token]/page.tsx` — server component; renders GiftPlayer or "not found"
- `app/g/[token]/GiftPlayer.tsx` — client component; audio playback, waveform, UI

**Security model (important — do not weaken):**
- The Supabase SERVICE ROLE key lives in `SUPABASE_SERVICE_ROLE_KEY` (server-only env var, never `NEXT_PUBLIC_`).
- `lib/get-gift.ts` runs server-side only. It exposes exactly one gift by `share_token` — nothing more.
- The `voice` and `photos` storage buckets are private. Never make them public. Access is via short-lived signed URLs (1 hour TTL) generated server-side.
- No RLS changes required; the service role bypasses RLS by design.

**Supabase schema (key columns):**
- `gifts`: `id`, `share_token`, `author_id`, `recipient_id`, `title`, `status`, `accepted`, `created_at`
- `people`: `id`, `display_name`, `avatar_url` (path in `photos` bucket), `avatar_color`
- `messages`: `id`, `gift_id`, `voice_url` (path in `voice` bucket), `photo_urls` (text[]), `caption`, `created_at`

**Join pattern:** `gifts.author_id → people.id`. Use `people!author_id(...)` in the Supabase select to disambiguate (gifts has two FKs to people: `author_id` and `recipient_id`).

**Storage buckets:** `voice` (m4a) and `photos` (jpg). Avatar paths (`people.avatar_url`) are also in the `photos` bucket under `avatars/{owner_id}/...`.

**"More messages" count:** a second query counts other gifts where `author_id` = sender and `recipient_id` = this recipient and `id` ≠ current gift. Exposed as `moreGiftsCount` in `GiftData`.

**Design:**
- Warm sunrise gradient: `172deg, #2b1d3a → #4a2c47 → #8a4a5a → #d98a6a`, slow background-position drift animation.
- Layout: `height: 100dvh`, three-section flex column (top: sender name; middle: scrollable player; bottom: pill + CTA, always pinned above fold).
- Content column capped at `maxWidth: 440px`, centered, gradient fills full viewport behind it.
- Waveform bars with varying idle heights (`IDLE_H` array), `transformOrigin: bottom`, animate on play.
- "More messages" pill always visible: specific count copy when `moreGiftsCount > 0`, soft copy when 0.
- App Store CTA: Apple logo + "Get the app to hear them all" / **Download Justin** → `https://apps.apple.com/au/app/justin/id1597447761`.

## Env vars

Set in Vercel (Production + Preview) **and** `.env.local` locally:

```
SUPABASE_URL=https://wunjsacvvjzsbvjmcsmp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service role key from Supabase dashboard → Project Settings → API>
```

`.env*` is in `.gitignore` — these are never committed.
