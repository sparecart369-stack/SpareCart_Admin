import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export function createSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live data.");
    return null;
  }

  if (supabaseUrl.includes("your-project-id")) {
    console.warn("Supabase URL is still using the placeholder value. Update .env.local with your project URL.");
    return null;
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (error) {
    console.warn("Unable to initialize the Supabase client:", error);
    return null;
  }
}

export const supabase = createSupabaseClient();
export const isSupabaseConfigured = Boolean(supabase);
