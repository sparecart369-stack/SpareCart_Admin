"use client";

import { useEffect } from "react";
import { probeSupabaseConnection } from "@/lib/supabase/connection-check";

export function SupabaseInitializer() {
  useEffect(() => {
    probeSupabaseConnection().then((result) => {
      if (result.connected) {
        console.log("✅ [Supabase] Connected successfully to:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      } else {
        console.warn("❌ [Supabase] Connection status:", result.error || "Failed to reach Supabase");
      }
    });
  }, []);

  return null;
}
