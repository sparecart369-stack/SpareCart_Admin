"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useSupabaseConnection() {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      if (!supabase) {
        setError("Supabase is not configured. Update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
        setConnected(false);
        return;
      }

      try {
        const { data, error: err } = await supabase.from("spare_parts").select("count()", { count: "exact", head: true });
        
        if (err) {
          console.error("❌ Supabase connection failed:", err.message);
          setError(err.message);
          setConnected(false);
        } else {
          console.log("✅ Supabase connection successful!");
          setConnected(true);
          setError(null);
        }
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
