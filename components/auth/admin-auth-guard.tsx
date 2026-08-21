"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSuperAdminAuth } from "@/lib/auth-context";

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useSuperAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-sky-500 to-indigo-500 text-xl font-black text-white shadow-xl shadow-emerald-500/30 animate-pulse">
              SK
            </span>
          </div>
          <p className="text-sm font-bold text-zinc-400">Verifying Super Admin Security...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-sm font-bold text-zinc-400">Redirecting to Super Admin Login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
