"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSuperAdminAuth } from "@/lib/auth-context";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  LockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserIcon,
} from "@/components/ui/icons";

export function SuperAdminLoginCard() {
  const router = useRouter();
  const { login } = useSuperAdminAuth();

  const [username, setUsername] = useState("sparecartadmin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleQuickFill = () => {
    setUsername("sparecartadmin");
    setPassword("8590925382");
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await login(username, password);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        setErrorMsg(res.error || "Authentication failed. Please check your credentials.");
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrorMsg("An unexpected authentication error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Dynamic Ambient Background Orbs */}
      <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Decorative Border Glow */}
      <div className="absolute -inset-0.5 rounded-[36px] bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 opacity-40 blur-xl transition duration-1000" />

      {/* Glassmorphic Super Admin Card */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-zinc-950/85 p-6 sm:p-10 shadow-2xl shadow-emerald-950/50 backdrop-blur-2xl text-white">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link href="/" className="group flex items-center gap-3.5">
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 text-base font-black text-white shadow-lg shadow-emerald-500/30 transition-transform group-hover:scale-105">
                SK
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-zinc-950 animate-pulse" />
            </div>
            <div>
              <span className="font-display block text-lg font-black tracking-tight text-white">
                SpareKart
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheckIcon className="h-3.5 w-3.5" />
                Super Admin Access Only
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Hero Title */}
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur">
            <SparklesIcon className="h-3.5 w-3.5 text-emerald-400" />
            Executive Founder Control Room
          </div>
          <h2 className="font-display mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
            Super Admin Sign In
          </h2>
          <p className="mt-1.5 text-sm text-zinc-400">
            Please enter your official Super Admin credentials to access full marketplace controls.
          </p>
        </div>

        {/* Quick Fill Preset Box */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <KeyIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-200">Super Admin Account</p>
                <p className="truncate text-[11px] text-zinc-400 font-mono">sparecartadmin</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="shrink-0 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 transition-all hover:bg-emerald-500/30 hover:border-emerald-400 active:scale-95"
            >
              Auto-Fill Credentials
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-4 text-emerald-300 animate-fadeIn">
            <CheckCircleIcon className="h-6 w-6 shrink-0 text-emerald-400 animate-bounce" />
            <div>
              <p className="text-sm font-bold">Authentication Verified!</p>
              <p className="text-xs text-emerald-300/80">Welcome Super Admin. Redirecting to founder control room...</p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && !isSuccess && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-rose-500/40 bg-rose-500/15 p-4 text-rose-300 animate-shake">
            <LockIcon className="h-5 w-5 shrink-0 text-rose-400" />
            <p className="text-xs font-medium leading-relaxed">{errorMsg}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Super Admin Name / ID
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                <UserIcon className="h-5 w-5" />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. sparecartadmin"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-zinc-500 outline-none backdrop-blur transition-all focus:border-emerald-500/60 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Password
              </label>
              <span className="text-[11px] text-zinc-500">Required</span>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                <LockIcon className="h-5 w-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (8590925382)"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-11 text-sm font-medium text-white placeholder-zinc-500 outline-none backdrop-blur transition-all focus:border-emerald-500/60 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 py-4 font-display text-sm font-black text-white shadow-xl shadow-emerald-950/50 transition-all duration-300 hover:opacity-95 hover:shadow-emerald-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Verifying Super Admin...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-white" />
                Access Granted!
              </span>
            ) : (
              <>
                <span>Enter Super Admin Control Room</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <p className="text-xs text-zinc-400">
            Protected by SpareKart Super Admin Security Protocols
          </p>
        </div>
      </div>
    </div>
  );
}
