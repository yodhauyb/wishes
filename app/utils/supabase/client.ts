import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // Fallbacks keep static prerender/build from crashing when env vars are
  // absent; at runtime the browser reads the inlined public values anyway.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key';
  return createBrowserClient(url, key);
}