"use client";

import { useSupabaseConnection } from "@/hooks/use-supabase-connection";

export function SupabaseStatus() {
  const { connected, error } = useSupabaseConnection();

  if (connected === null) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-xs dark:bg-zinc-800">
        <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500"></div>
        <span className="text-zinc-600 dark:text-zinc-300">Testing Supabase...</span>
      </div>
    );
  }

  if (connected) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-2 text-xs dark:bg-emerald-900/30">
        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
        <span className="font-semibold text-emerald-700 dark:text-emerald-300">Supabase Connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg bg-rose-100 px-3 py-2 text-xs dark:bg-rose-900/30">
      <div className="h-2 w-2 rounded-full bg-rose-500"></div>
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-rose-700 dark:text-rose-300">Connection Failed</span>
        {error && <span className="text-rose-600 dark:text-rose-400">{error}</span>}
      </div>
    </div>
  );
}
