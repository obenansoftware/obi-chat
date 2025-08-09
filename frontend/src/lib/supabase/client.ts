import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Environment-specific redirect URL for OAuth flows
  const redirectTo = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/auth/callback'
    : 'https://chat.obenan.ai/auth/callback'

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        redirectTo,
      },
    }
  )
}
