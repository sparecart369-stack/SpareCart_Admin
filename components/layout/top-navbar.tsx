"use client";

import { usePathname } from "next/navigation";
import { BellIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import { navigation } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function TopNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const page = navigation.find((item) => item.href === pathname)?.label ?? "Dashboard";

  return (
    <header className="sticky top-0 z-20 border-b border-white/30 bg-white/70 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/70 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white lg:hidden"
          aria-label="Open sidebar"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">SpareKart / {page}</div>
          <h1 className="truncate text-lg font-black text-zinc-950 dark:text-white sm:text-2xl">{page}</h1>
        </div>
        <label className="hidden h-11 min-w-72 items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-4 text-sm text-zinc-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 md:flex">
          <SearchIcon className="h-4 w-4" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-zinc-400"
            placeholder="Search dashboard"
            aria-label="Search dashboard"
          />
        </label>
        <ThemeToggle />
        <button
          className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/70 bg-white/70 text-zinc-700 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" />
        </button>
        <div className="hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/10 sm:flex">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-zinc-950 to-zinc-700 text-xs font-black text-white dark:from-white dark:to-zinc-300 dark:text-zinc-950">
            AD
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-zinc-950 dark:text-white">Admin</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Founder</span>
          </span>
        </div>
      </div>
    </header>
  );
}
