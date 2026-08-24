"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, BellIcon, GlobeIcon, LogOutIcon, MenuIcon, SearchIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { navigation } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useSuperAdminAuth } from "@/lib/auth-context";

export function TopNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const page = navigation.find((item) => item.href === pathname)?.label ?? "Dashboard";
  const { user, logout } = useSuperAdminAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 px-4 py-3.5 backdrop-blur-2xl transition-all duration-200 dark:border-white/10 dark:bg-zinc-950/70 sm:px-6">
      <div className="flex items-center gap-3.5">
        <button
          onClick={onMenuClick}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-zinc-200/80 bg-white/90 text-zinc-700 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white lg:hidden"
          aria-label="Open sidebar"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            <span>SpareKart</span>
            <span>/</span>
            <span className="text-zinc-400">{page}</span>
          </div>
          <h1 className="font-display truncate text-lg font-black tracking-tight text-zinc-950 dark:text-white sm:text-2xl">{page}</h1>
        </div>

        <label className="group hidden h-11 min-w-72 items-center gap-2.5 rounded-2xl border border-white/80 bg-white/80 px-4 text-sm text-zinc-500 shadow-sm backdrop-blur transition-all focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 md:flex">
          <SearchIcon className="h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-emerald-500" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-zinc-400"
            placeholder="Search parts, orders, sellers..."
            aria-label="Search dashboard"
          />
          <kbd className="hidden rounded-lg border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-400 lg:inline-block">
            ⌘K
          </kbd>
        </label>

        <ThemeToggle />

        <button
          className="group relative grid h-11 w-11 place-items-center rounded-2xl border border-white/80 bg-white/80 text-zinc-700 shadow-sm transition hover:bg-white hover:text-zinc-950 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950 animate-pulse" />
        </button>

        <div className="hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 sm:flex">
          <div className="relative">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-600 text-xs font-black text-white shadow-md shadow-emerald-500/20">
              SA
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-950" />
          </div>
          <span className="leading-tight">
            <span className="font-display flex items-center gap-1 text-xs font-bold text-zinc-950 dark:text-white">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-500" />
              {user?.username || "sparecartadmin"}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Super Admin
            </span>
          </span>
          <button
            onClick={logout}
            title="Log out from Super Admin"
            className="ml-1 rounded-xl p-1.5 text-zinc-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
            aria-label="Logout Super Admin"
          >
            <LogOutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
