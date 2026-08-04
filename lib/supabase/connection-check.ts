import { supabase } from "./client";

/** Lightweight probe against the table this app actually reads in production. */
export async function probeSupabaseConnection(): Promise<{
  connected: boolean;
  error?: string;
}> {
  if (!supabase) {
    return { connected: false, error: "Supabase is not configured." };
  }

  try {
    const { error } = await supabase
      .from("listings")
      .select("id", { count: "exact", head: true });

    if (error) {
      return { connected: false, error: error.message };
    }

    return { connected: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("Failed to fetch")) {
      return {
        connected: false,
        error: `Unable to reach Supabase at ${process.env.NEXT_PUBLIC_SUPABASE_URL}. Please check if NEXT_PUBLIC_SUPABASE_URL in .env.local is correct (from Supabase Dashboard -> Project Settings -> API).`,
      };
    }
    return { connected: false, error: message };
  }
}
