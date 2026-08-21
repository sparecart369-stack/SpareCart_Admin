import type { Metadata } from "next";
import { AuthBranding } from "@/components/auth/auth-branding";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Create Account | SpareKart Marketplace",
  description: "Register a new buyer or seller account on SpareKart.",
};

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_50%,_#f8fafc_100%)] p-4 sm:p-6 lg:p-10 dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-8 lg:grid lg:grid-cols-2">
        <AuthBranding />
        <div className="flex w-full justify-center">
          <AuthCard initialMode="signup" initialRole="buyer" />
        </div>
      </div>
    </main>
  );
}
