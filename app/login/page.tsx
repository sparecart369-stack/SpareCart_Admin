import type { Metadata } from "next";
import { AuthBranding } from "@/components/auth/auth-branding";
import { SuperAdminLoginCard } from "@/components/auth/super-admin-login-card";

export const metadata: Metadata = {
  title: "Super Admin Sign In | SpareKart Admin Portal",
  description: "Sign in to Super Admin Control Room for SpareKart.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.25),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.2),_transparent_40%),linear-gradient(135deg,_#030712_0%,_#091224_50%,_#030712_100%)] p-4 sm:p-6 lg:p-10 text-white overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-8 lg:grid lg:grid-cols-2">
        <AuthBranding />
        <div className="flex w-full justify-center">
          <SuperAdminLoginCard />
        </div>
      </div>
    </main>
  );
}
