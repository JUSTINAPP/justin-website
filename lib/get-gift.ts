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
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set');
    return null;
  }
  const supabase = createAdminClient();

  const { data: gift, error: giftError } = await supabase
    .from('gifts')
    .select('id, author_id, people(display_name, avatar_url, avatar_color)')
    .eq('share_token', token)
    .single();

  if (giftError || !gift) return null;

  const { data: messages, error: msgError } = await supabase
    .from('messages')
    .select('id, voice_url, photo_urls, caption')
    .eq('gift_id', gift.id)
    .order('created_at', { ascending: true });

  if (msgError || !messages?.length) return null;

  const processedMessages = await Promise.all(
    messages.map(async (msg) => {
      const { data: voiceSigned } = await supabase.storage
        .from('voice')
        .createSignedUrl(msg.voice_url, TTL);

      const photoUrls = await Promise.all(
        (msg.photo_urls ?? []).map(async (path: string) => {
          const { data } = await supabase.storage
            .from('photos')
            .createSignedUrl(path, TTL);
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

  const person = gift.people as {
    display_name?: string;
    avatar_url?: string | null;
    avatar_color?: string | null;
  } | null;
  const senderName = person?.display_name ?? 'Someone special';
  const senderAvatarColor = person?.avatar_color ?? null;

  let senderAvatarUrl: string | null = null;
  if (person?.avatar_url) {
    const { data } = await supabase.storage
      .from('photos')
      .createSignedUrl(person.avatar_url, TTL);
    senderAvatarUrl = data?.signedUrl ?? null;
  }

  return {
    id: gift.id,
    senderName,
    senderAvatarUrl,
    senderAvatarColor,
    messages: processedMessages,
  };
}
