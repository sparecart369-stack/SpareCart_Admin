"use client";

import { useEffect, useState } from "react";
import { probeSupabaseConnection } from "@/lib/supabase/connection-check";

export function useSupabaseConnection() {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const result = await probeSupabaseConnection();

        if (!result.connected) {
          const message =
            result.error ??
            "Supabase is not configured. Update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.";
          console.error("❌ Supabase connection failed:", message);
          setError(message);
          setConnected(false);
          return;
        }

        console.log("✅ Supabase connection successful!");
        setConnected(true);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("❌ Supabase connection error:", errorMessage);
        setError(errorMessage);
        setConnected(false);
      }
    };

    testConnection();
  }, []);

  return { connected, error };
}
