import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  tone?: "emerald" | "sky" | "violet" | "amber" | "rose" | "zinc";
}

const tones = {
  emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-700 dark:text-emerald-300",
  sky: "from-sky-500/20 to-sky-500/5 text-sky-700 dark:text-sky-300",
  violet: "from-violet-500/20 to-violet-500/5 text-violet-700 dark:text-violet-300",
  amber: "from-amber-500/20 to-amber-500/5 text-amber-700 dark:text-amber-300",
  rose: "from-rose-500/20 to-rose-500/5 text-rose-700 dark:text-rose-300",
  zinc: "from-zinc-500/20 to-zinc-500/5 text-zinc-700 dark:text-zinc-300",
};

export function StatCard({ label, value, change, icon, tone = "emerald" }: StatCardProps) {
  return (
    <article className="group rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-zinc-950/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-950/10 dark:border-white/10 dark:bg-white/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
          <p className="mt-3 text-2xl font-black tracking-tight text-zinc-950 dark:text-white">{value}</p>
        </div>
        <div className={cn("grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br", tones[tone])}>{icon}</div>
      </div>
      <p className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-300">{change}</p>
    </article>
  );
}
