import { supabase } from "./client";

function connectionError(message: string): string {
  if (/failed to fetch|fetch failed|networkerror|network request failed/i.test(message)) {
    return `Unable to reach Supabase at ${process.env.NEXT_PUBLIC_SUPABASE_URL}. Verify the Project URL in Supabase's Connect dialog, update NEXT_PUBLIC_SUPABASE_URL in .env.local, and restart the dev server. Also check your network and whether the project is active.`;
  }
  return message;
}

/** Check the public client used by the browser without counting the entire table. */
export async function probeSupabaseConnection(): Promise<{
  connected: boolean;
  error?: string;
}> {
  if (!supabase) {
    return {
      connected: false,
      error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, then restart the dev server.",
    };
  }

  try {
    const { error } = await supabase
      .from("listings")
      .select("id")
      .limit(1)
      .abortSignal(AbortSignal.timeout(10000));

    if (error) {
      return { connected: false, error: connectionError(error.message) };
    }

    return { connected: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { connected: false, error: connectionError(message) };
  }
}
