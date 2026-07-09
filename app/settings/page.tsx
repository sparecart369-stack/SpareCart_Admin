"use client";

import { useState } from "react";
import { GlassCard } from "@/components/cards/glass-card";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [darkReady, setDarkReady] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="animate-float-in space-y-6">
      <PageHeader title="Settings" description="Manage admin profile, visual preferences, notification routing, and security controls." />

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard title="Admin Profile" subtitle="Founder account information">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Name</span>
              <input className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 outline-none focus:ring-2 focus:ring-emerald-400/50 dark:border-white/10 dark:bg-white/10" defaultValue="Spare Cart Admin" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Email</span>
              <input className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 outline-none focus:ring-2 focus:ring-emerald-400/50 dark:border-white/10 dark:bg-white/10" defaultValue="admin@sparecart.example" />
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Role</span>
              <input className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 outline-none focus:ring-2 focus:ring-emerald-400/50 dark:border-white/10 dark:bg-white/10" defaultValue="Founder / Super Admin" />
            </label>
          </div>
          <Button className="mt-5" variant="primary">Save Profile</Button>
        </GlassCard>

        <GlassCard title="Theme" subtitle="Dark-mode ready dashboard preferences">
          <SettingToggle label="System dark mode support" description="The UI follows the user's operating-system theme." checked={darkReady} onChange={setDarkReady} />
          <div className="mt-5 grid grid-cols-4 gap-3">
            {["bg-emerald-400", "bg-sky-400", "bg-violet-400", "bg-rose-400"].map((color) => (
              <button key={color} className={`h-12 rounded-2xl ${color} ring-4 ring-white/70 dark:ring-white/10`} aria-label={`Choose ${color} accent`} />
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Notifications" subtitle="Choose operational alerts">
          <SettingToggle label="Email alerts" description="Receive summaries for payouts, failed payments, and seller approvals." checked={emailAlerts} onChange={setEmailAlerts} />
          <SettingToggle label="Order alerts" description="Notify the admin when high-value orders or delays happen." checked={orderAlerts} onChange={setOrderAlerts} />
        </GlassCard>

        <GlassCard title="Security" subtitle="Protect the founder account">
          <SettingToggle label="Two-factor authentication" description="Require an additional verification step on login." checked={twoFactor} onChange={setTwoFactor} />
          <div className="mt-5 rounded-2xl bg-amber-500/10 p-4 text-sm leading-6 text-amber-800 dark:text-amber-200">
            Supabase authentication is intentionally not connected yet. These controls are UI-ready dummy states.
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-200/70 py-4 last:border-b-0 dark:border-white/10">
      <div>
        <p className="text-sm font-black text-zinc-950 dark:text-white">{label}</p>
        <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition ${checked ? "bg-emerald-500" : "bg-zinc-300 dark:bg-white/20"}`}
        aria-pressed={checked}
      >
        <span className={`h-5 w-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
