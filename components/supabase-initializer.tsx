"use client";

import { useEffect } from "react";
import { testSupabaseConnection } from "@/lib/supabase-queries";

export function SupabaseInitializer() {
  useEffect(() => {
    testSupabaseConnection().then((result) => {
      if (result.connected) {
        console.log("✅ [Supabase] Connected successfully to:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      } else {
        console.error("❌ [Supabase] Connection status:", result.error || "Failed to reach Supabase");
      }
    });
  }, []);

  return null;
}
