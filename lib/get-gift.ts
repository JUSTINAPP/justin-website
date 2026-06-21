import { createAdminClient } from './supabase-server';

export type GiftMessage = {
  id: string;
  voiceUrl: string;
  photoUrls: string[];
  caption: string | null;
};

export type GiftData = {
  id: string;
  senderName: string;
  claimCode: string | null;
  moreGiftsCount: number;
  messages: GiftMessage[];
};

const TTL = 3600;

export async function getGiftByToken(token: string): Promise<GiftData | null> {
  console.error('[getGiftByToken] called with token:', token);

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[getGiftByToken] MISSING env vars — SUPABASE_URL:', !!process.env.SUPABASE_URL, 'SUPABASE_SERVICE_ROLE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    return null;
  }

  const supabase = createAdminClient();

  // ── Query 1: gift row + author name ─────────────────────────────────────
  // people!author_id disambiguates: gifts has two FKs to people (author_id + recipient_id)
  const { data: gift, error: giftError } = await supabase
    .from('gifts')
    .select('id, author_id, recipient_id, claim_code, people!author_id(display_name)')
    .eq('share_token', token)
    .single();

  if (giftError) {
    console.error('[getGiftByToken] gifts error — message:', giftError.message, '| code:', giftError.code, '| details:', giftError.details);
  }
  console.error('[getGiftByToken] gifts query data:', gift
    ? { id: gift.id, author_id: gift.author_id, recipient_id: gift.recipient_id, people: gift.people }
    : null
  );

  if (giftError || !gift) {
    console.error('[getGiftByToken] returning null after gifts query failure');
    return null;
  }

  // ── Query 2: messages for this gift ─────────────────────────────────────
  console.error('[getGiftByToken] querying messages for gift_id:', gift.id);
  const { data: messages, error: msgError } = await supabase
    .from('messages')
    .select('id, voice_url, photo_urls, caption')
    .eq('gift_id', gift.id)
    .order('created_at', { ascending: true });

  console.error('[getGiftByToken] messages — error:', msgError, '| count:', messages?.length ?? 0);

  if (msgError || !messages?.length) {
    console.error('[getGiftByToken] returning null after messages query failure or empty result');
    return null;
  }

  // ── Query 3: count other gifts from same sender to same recipient ────────
  const { count: moreCount, error: countError } = await supabase
    .from('gifts')
    .select('id', { count: 'exact', head: true })
    .eq('author_id', gift.author_id)
    .eq('recipient_id', gift.recipient_id)
    .neq('id', gift.id);

  if (countError) {
    console.error('[getGiftByToken] more-gifts count error:', countError.message);
  }
  console.error('[getGiftByToken] moreGiftsCount:', moreCount);

  // ── Signed URLs for voice + photos ──────────────────────────────────────
  const processedMessages = await Promise.all(
    messages.map(async (msg) => {
      const { data: voiceSigned, error: voiceErr } = await supabase.storage
        .from('voice')
        .createSignedUrl(msg.voice_url, TTL);

      if (voiceErr) {
        console.error('[getGiftByToken] voice signed URL error for', msg.voice_url, ':', voiceErr);
      }

      const photoUrls = await Promise.all(
        (msg.photo_urls ?? []).map(async (path: string) => {
          const { data, error: photoErr } = await supabase.storage
            .from('photos')
            .createSignedUrl(path, TTL);
          if (photoErr) {
            console.error('[getGiftByToken] photo signed URL error for', path, ':', photoErr);
          }
          return data?.signedUrl ?? null;
        })
      );

      return {
        id: msg.id,
        voiceUrl: voiceSigned?.signedUrl ?? '',
        photoUrls: photoUrls.filter((u): u is string => u !== null),
        caption: msg.caption ?? null,
      };
    })
  );

  const person = gift.people as { display_name?: string } | null;
  const senderName = person?.display_name ?? 'Someone special';

  console.error('[getGiftByToken] success — senderName:', senderName, '| messages:', processedMessages.length, '| moreGiftsCount:', moreCount);

  const claimCode = (gift.claim_code as string | null) ?? null;

  return {
    id: gift.id,
    senderName,
    claimCode,
    moreGiftsCount: moreCount ?? 0,
    messages: processedMessages,
  };
}
