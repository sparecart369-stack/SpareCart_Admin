"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon } from "@/components/ui/icons";
import { navigation } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        className={cn("fixed inset-0 z-30 bg-zinc-950/40 backdrop-blur-sm transition lg:hidden", open ? "block" : "hidden")}
        onClick={onClose}
        aria-label="Close navigation overlay"
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/30 bg-white/80 p-4 shadow-2xl shadow-zinc-950/10 backdrop-blur-2xl transition-transform duration-300 dark:border-white/10 dark:bg-zinc-950/80 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-3 px-2 py-3">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 via-sky-500 to-violet-500 text-base font-black text-white shadow-lg shadow-emerald-500/25">
              SK
            </span>
            <span>
              <span className="block text-sm font-black tracking-wide text-zinc-950 dark:text-white">SpareKart</span>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Admin Dashboard</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl text-zinc-500 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-bold transition",
                  active
                    ? "bg-zinc-950 text-white shadow-lg shadow-emerald-500/20 dark:bg-white dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-white/80 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 via-white/60 to-sky-500/15 p-4 dark:via-white/5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">Founder view</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-200">
            Live marketplace control room with dummy data ready for Supabase later.
          </p>
        </div>
      </aside>
    </>
  );
}
