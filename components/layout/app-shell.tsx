"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { AdminAuthGuard } from "@/components/auth/admin-auth-guard";

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
      <div className="app-shell-frame min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-72">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
