"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { AdminAuthGuard } from "@/components/auth/admin-auth-guard";
import { ArrowLeftIcon, GlobeIcon } from "@/components/ui/icons";

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isStandaloneRoute =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname?.startsWith("/admin/login") ||
    pathname?.startsWith("/auth");

  if (isStandaloneRoute) {
    return <div className="min-h-screen w-full">{children}</div>;
  }

  return (
    <AdminAuthGuard>
      <div className="app-shell-frame min-h-screen relative">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-72">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>

        {/* Floating Glassmorphic Quick Switch Capsule */}
        <Link
          href="/"
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-zinc-950/85 px-4.5 py-3 text-xs font-black text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:bg-zinc-900 hover:shadow-emerald-500/30 dark:bg-white/90 dark:text-zinc-950 dark:border-emerald-500/50 dark:hover:bg-white"
          title="Return to main SpareKart website"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <ArrowLeftIcon className="h-4 w-4 text-emerald-400 transition-transform group-hover:-translate-x-1 dark:text-emerald-600" />
          <GlobeIcon className="h-4 w-4 text-emerald-400 transition-transform group-hover:rotate-45 dark:text-emerald-600" />
          <span className="tracking-wide">Website Storefront</span>
        </Link>
      </div>
    </AdminAuthGuard>
  );
}
