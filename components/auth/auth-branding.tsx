"use client";

import Link from "next/link";
import { BoxIcon, ShieldCheckIcon, StoreIcon, UsersIcon } from "@/components/ui/icons";

export function AuthBranding() {
  return (
    <div className="relative hidden w-full flex-col justify-between overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-950 p-10 text-white shadow-2xl lg:flex">
      {/* Glow Orbs */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute left-1/3 top-1/2 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Top Branding Header */}
      <div className="relative z-10 space-y-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-sky-500 to-indigo-500 text-lg font-black text-white shadow-lg shadow-emerald-500/30">
            SK
          </span>
          <div>
            <span className="font-display block text-xl font-black tracking-tight text-white">
              SpareKart
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Admin & Marketplace Platform
            </span>
          </div>
        </Link>

        <div className="space-y-3 pt-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Founder Control Room
          </span>
          <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-white xl:text-5xl">
            Empowering the <span className="gradient-text-emerald">Spare Parts</span> Ecosystem.
          </h1>
          <p className="max-w-md text-sm leading-7 text-zinc-300">
            Access real-time analytics, verify seller listings, monitor customer demand, and streamline vehicle parts distribution across regional markets.
          </p>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="relative z-10 my-8 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-emerald-500/30 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <BoxIcon className="h-5 w-5" />
          </div>
          <p className="font-display mt-3 text-lg font-black text-white">10,000+</p>
          <p className="text-xs font-semibold text-zinc-400">Active Spare Parts</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-sky-500/30 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
            <StoreIcon className="h-5 w-5" />
          </div>
          <p className="font-display mt-3 text-lg font-black text-white">1,000+</p>
          <p className="text-xs font-semibold text-zinc-400">Verified Sellers</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-indigo-500/30 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
            <UsersIcon className="h-5 w-5" />
          </div>
          <p className="font-display mt-3 text-lg font-black text-white">5,000+</p>
          <p className="text-xs font-semibold text-zinc-400">Registered Buyers</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-amber-500/30 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            <ShieldCheckIcon className="h-5 w-5" />
          </div>
          <p className="font-display mt-3 text-lg font-black text-white">99.9%</p>
          <p className="text-xs font-semibold text-zinc-400">Security Uptime</p>
        </div>
      </div>

      {/* Footer Security Badge */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Encrypted Session • TLS 1.3</span>
        </div>
        <span className="font-semibold text-zinc-500">v2.4.0-admin</span>
      </div>
    </div>
  );
}
