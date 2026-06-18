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
  senderAvatarUrl: string | null;
  senderAvatarColor: string | null;
  messages: GiftMessage[];
};

const TTL = 3600;

export async function getGiftByToken(token: string): Promise<GiftData | null> {
  console.error('[getGiftByToken] called with token:', token);

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[getGiftByToken] MISSING env vars — SUPABASE_URL:', !!process.env.SUPABASE_URL, 'SUPABASE_SERVICE_ROLE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    return null;
  }
  console.error('[getGiftByToken] env vars present, creating admin client');

  const supabase = createAdminClient();

  // ── Query 1: gift row + author (people join) ─────────────────────────────
  // Use people!author_id(...) to disambiguate: gifts has two FKs to people
  // (author_id and recipient_id) and PostgREST requires an explicit hint.
  const giftSelect = 'id, author_id, people!author_id(display_name, avatar_url, avatar_color)';
  console.error('[getGiftByToken] gifts query select:', giftSelect);
  console.error('[getGiftByToken] gifts query share_token =', token);

  const { data: gift, error: giftError } = await supabase
    .from('gifts')
    .select(giftSelect)
    .eq('share_token', token)
    .single();

  console.error('[getGiftByToken] gifts query error (raw):', giftError);
  console.error('[getGiftByToken] gifts query error (JSON):', JSON.stringify(giftError));
  if (giftError) {
    console.error('[getGiftByToken] gifts error — message:', giftError.message, '| code:', giftError.code, '| details:', giftError.details, '| hint:', giftError.hint);
  }
  console.error('[getGiftByToken] gifts query data:', gift
    ? { id: gift.id, author_id: gift.author_id, people: gift.people }
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

  console.error('[getGiftByToken] messages query — error:', msgError, '| count:', messages?.length ?? 0, '| rows:', messages?.map(m => ({ id: m.id, voice_url: m.voice_url })));

  if (msgError || !messages?.length) {
    console.error('[getGiftByToken] returning null after messages query failure or empty result');
    return null;
  }

  // ── Signed URLs ─────────────────────────────────────────────────────────
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

  // ── Author / people ──────────────────────────────────────────────────────
  const person = gift.people as {
    display_name?: string;
    avatar_url?: string | null;
    avatar_color?: string | null;
  } | null;

  console.error('[getGiftByToken] author (people) resolved:', person);

  const senderName = person?.display_name ?? 'Someone special';
  const senderAvatarColor = person?.avatar_color ?? null;

  let senderAvatarUrl: string | null = null;
  if (person?.avatar_url) {
    const { data, error: avatarErr } = await supabase.storage
      .from('photos')
      .createSignedUrl(person.avatar_url, TTL);
    if (avatarErr) {
      console.error('[getGiftByToken] avatar signed URL error for', person.avatar_url, ':', avatarErr);
    }
    senderAvatarUrl = data?.signedUrl ?? null;
  }

  console.error('[getGiftByToken] success — returning gift id:', gift.id, 'senderName:', senderName, 'messageCount:', processedMessages.length);

  return {
    id: gift.id,
    senderName,
    senderAvatarUrl,
    senderAvatarColor,
    messages: processedMessages,
  };
}
