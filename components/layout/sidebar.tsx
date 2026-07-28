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
        className={cn("fixed inset-0 z-30 bg-zinc-950/60 backdrop-blur-md transition-opacity duration-300 lg:hidden", open ? "opacity-100 block" : "opacity-0 hidden")}
        onClick={onClose}
        aria-label="Close navigation overlay"
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/40 bg-white/75 p-4 shadow-2xl backdrop-blur-2xl transition-transform duration-300 dark:border-white/10 dark:bg-zinc-950/80 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-3 px-2 py-3">
          <Link href="/" className="group flex items-center gap-3.5" onClick={onClose}>
            <div className="relative">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-sky-500 to-indigo-500 text-base font-black text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-105">
                SK
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-950 animate-pulse" />
            </div>
            <span>
              <span className="font-display block text-base font-black tracking-tight text-zinc-950 dark:text-white">SpareKart</span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Admin Platform</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 space-y-1.5">
          {navigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex min-h-12 items-center gap-3.5 rounded-2xl px-3.5 text-sm font-bold transition-all duration-200",
                  active
                    ? "bg-zinc-950 text-white shadow-xl shadow-emerald-500/15 dark:bg-white dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-white/90 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white",
                )}
              >
                {active ? (
                  <span className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-emerald-400 dark:bg-emerald-500" />
                ) : null}
                <Icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", active ? "text-emerald-400 dark:text-emerald-600" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-purple-500/10 p-4 backdrop-blur-md dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-display text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Live Control Room</p>
          </div>
          <p className="mt-2 text-xs font-semibold leading-5 text-zinc-600 dark:text-zinc-300">
            Real-time operations dashboard for SpareKart listings, sellers, and order performance.
          </p>
        </div>
      </aside>
    </>
  );
}
