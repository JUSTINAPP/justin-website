import { NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return Response.json({ error: 'Missing token' }, { status: 400 });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[opened] missing env vars');
    return Response.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const supabase = createAdminClient();

  // Resolve gift by share_token
  const { data: gift, error: giftError } = await supabase
    .from('gifts')
    .select('id')
    .eq('share_token', token)
    .single();

  if (giftError || !gift) {
    console.error('[opened] gift not found for token:', token, giftError?.message);
    return Response.json({ error: 'Gift not found' }, { status: 404 });
  }

  // Get the first message for this gift
  const { data: message, error: msgError } = await supabase
    .from('messages')
    .select('id, opened')
    .eq('gift_id', gift.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (msgError || !message) {
    console.error('[opened] message not found for gift:', gift.id, msgError?.message);
    return Response.json({ error: 'Message not found' }, { status: 404 });
  }

  // First-open-wins: if already marked opened, do nothing (idempotent)
  if (message.opened) {
    console.log('[opened] already opened, skipping — message:', message.id);
    return Response.json({ status: 'already_opened' }, { status: 200 });
  }

  // Mark as opened with the current timestamp
  const { error: updateError } = await supabase
    .from('messages')
    .update({ opened: true, opened_at: new Date().toISOString() })
    .eq('id', message.id);

  if (updateError) {
    console.error('[opened] update failed:', updateError.message);
    return Response.json({ error: 'Failed to record open' }, { status: 500 });
  }

  console.log('[opened] recorded — message:', message.id, 'gift:', gift.id);
  return Response.json({ status: 'opened' }, { status: 200 });
}
