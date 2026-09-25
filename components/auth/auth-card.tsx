"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  AppleIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  GithubIcon,
  GoogleIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/components/ui/icons";

type AuthMode = "login" | "signup";
type UserRole = "admin" | "seller" | "buyer";

interface AuthCardProps {
  initialMode?: AuthMode;
  initialRole?: UserRole;
}

export function AuthCard({ initialMode = "login", initialRole = "admin" }: AuthCardProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State
  const [fullName, setFullName] = useState(role === "admin" ? "SpareKart Admin" : "");
  const [email, setEmail] = useState(
    role === "admin" ? "salahkoyilandy@gmail.com" : role === "seller" ? "seller@sparekart.com" : "buyer@sparekart.com"
  );
  const [phone, setPhone] = useState("+91 85909 25382");
  const [password, setPassword] = useState("••••••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Toast / Feedback simulation
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === "admin") {
      setEmail("salahkoyilandy@gmail.com");
      setFullName("SpareKart Admin Owner");
    } else if (newRole === "seller") {
      setEmail("seller@autoparts.com");
      setFullName("Rajesh Motors");
    } else {
      setEmail("customer@sparekart.com");
      setFullName("Alex Morgan");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      const actionText = mode === "login" ? "Signed in successfully!" : "Account created successfully!";
      setToastMessage(`${actionText} Redirecting to Admin Dashboard...`);

      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    }, 600);
  };

  const handleQuickDemoAdmin = () => {
    setIsSubmitting(true);
    setMode("login");
    setRole("admin");
    setEmail("salahkoyilandy@gmail.com");
    setPassword("admin123456");

    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage("⚡ Quick Admin Auth Verified! Redirecting to Admin Dashboard...");
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    }, 400);
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Decorative Glow background */}
      <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 opacity-30 blur-2xl transition duration-1000 group-hover:opacity-100" />

      {/* Main Glassmorphic Auth Container */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/85 p-6 sm:p-10 shadow-2xl shadow-emerald-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/85">
        {/* Top Header & Theme Switcher */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-5 dark:border-white/10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-sky-500 to-indigo-500 text-sm font-black text-white shadow-md shadow-emerald-500/30 transition-transform group-hover:scale-105">
                SK
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-950 animate-pulse" />
            </div>
            <div>
              <span className="font-display block text-base font-black tracking-tight text-zinc-950 dark:text-white">
                SpareKart
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Control Portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="rounded-xl border border-zinc-200/80 bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-700 transition hover:bg-zinc-200 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white/20"
            >
              ← Back to Site
            </Link>
          </div>
        </div>

        {/* Tab Switcher: Login vs Sign Up */}
        <div className="mt-6 grid grid-cols-2 rounded-2xl bg-zinc-200/60 p-1.5 backdrop-blur dark:bg-zinc-950/60">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setToastMessage(null);
            }}
            className={`rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
              mode === "login"
                ? "bg-white text-zinc-950 shadow-md dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setToastMessage(null);
            }}
            className={`rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
              mode === "signup"
                ? "bg-white text-zinc-950 shadow-md dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Selector Pills */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Account Access Level
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "admin", label: "Admin Portal", icon: "🛡️" },
              { id: "seller", label: "Seller Partner", icon: "🏪" },
              { id: "buyer", label: "Customer", icon: "🚗" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleRoleChange(item.id as UserRole)}
                className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 px-2 text-xs font-bold transition-all ${
                  role === item.id
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-300 shadow-sm"
                    : "border-zinc-200/80 bg-white/50 text-zinc-600 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10"
                }`}
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-6 space-y-1">
          <h2 className="font-display text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
            {mode === "login"
              ? role === "admin"
                ? "Welcome back, Admin"
                : "Sign in to your account"
              : "Create your SpareKart profile"}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {mode === "login"
              ? "Enter your credentials to access live marketplace controls."
              : "Join SpareKart to buy, sell, and manage vehicle spare parts seamlessly."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-xs font-bold text-zinc-700 dark:text-zinc-300">Full Name</label>
              <div className="relative flex items-center">
                <UserIcon className="absolute left-3.5 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-2xl border border-zinc-200/90 bg-white/90 py-3 pl-10 pr-4 text-sm font-semibold text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-bold text-zinc-700 dark:text-zinc-300">Email Address</label>
            <div className="relative flex items-center">
              <MailIcon className="absolute left-3.5 h-4 w-4 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-zinc-200/90 bg-white/90 py-3 pl-10 pr-4 text-sm font-semibold text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-xs font-bold text-zinc-700 dark:text-zinc-300">Phone Number</label>
              <div className="relative flex items-center">
                <PhoneIcon className="absolute left-3.5 h-4 w-4 text-zinc-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 85909 25382"
                  className="w-full rounded-2xl border border-zinc-200/90 bg-white/90 py-3 pl-10 pr-4 text-sm font-semibold text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Password</label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => alert("UI Demo: Password reset link would be sent to your email.")}
                  className="text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <LockIcon className="absolute left-3.5 h-4 w-4 text-zinc-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-zinc-200/90 bg-white/90 py-3 pl-10 pr-11 text-sm font-semibold text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-xs font-bold text-zinc-700 dark:text-zinc-300">Confirm Password</label>
              <div className="relative flex items-center">
                <LockIcon className="absolute left-3.5 h-4 w-4 text-zinc-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full rounded-2xl border border-zinc-200/90 bg-white/90 py-3 pl-10 pr-11 text-sm font-semibold text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Checkboxes */}
          <div className="flex items-center gap-2 pt-1">
            {mode === "login" ? (
              <label className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800"
                />
                Remember this device for 30 days
              </label>
            ) : (
              <label className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800"
                />
                I agree to SpareKart Terms of Service & Privacy Policy
              </label>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.01] hover:shadow-emerald-500/40 active:scale-[0.99] disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {mode === "login"
                  ? role === "admin"
                    ? "Enter Admin Dashboard"
                    : "Sign In to SpareKart"
                  : "Complete Registration"}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </button>
        </form>

        {/* Demo Fast Login Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleQuickDemoAdmin}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-500/50 bg-emerald-500/10 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-500/20 dark:border-emerald-400/40 dark:bg-emerald-500/20 dark:text-emerald-300"
          >
            <ShieldCheckIcon className="h-4 w-4 text-emerald-500" />
            <span>⚡ Demo Mode: Quick 1-Click Admin Access</span>
          </button>
        </div>

        {/* Feedback Toast Simulation */}
        {toastMessage && (
          <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-center text-xs font-bold text-emerald-700 animate-float-in dark:text-emerald-300">
            {toastMessage}
          </div>
        )}

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-white/10" />
          </div>
          <span className="relative bg-white/90 px-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400 backdrop-blur dark:bg-zinc-900/90 dark:text-zinc-500">
            Or sign in with
          </span>
        </div>

        {/* Social Sign In Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleQuickDemoAdmin()}
            className="flex items-center justify-center rounded-2xl border border-zinc-200/80 bg-white/80 py-2.5 shadow-sm transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            aria-label="Sign in with Google"
          >
            <GoogleIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoAdmin()}
            className="flex items-center justify-center rounded-2xl border border-zinc-200/80 bg-white/80 py-2.5 text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label="Sign in with Apple"
          >
            <AppleIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoAdmin()}
            className="flex items-center justify-center rounded-2xl border border-zinc-200/80 bg-white/80 py-2.5 text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label="Sign in with GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom Toggle Prompt */}
        <p className="mt-6 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-bold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Sign up now
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-bold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Sign in here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
