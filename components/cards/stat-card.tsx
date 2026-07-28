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
  emerald: "from-emerald-500/25 via-emerald-500/10 to-teal-500/20 text-emerald-600 dark:text-emerald-300 ring-emerald-500/20",
  sky: "from-sky-500/25 via-sky-500/10 to-blue-500/20 text-sky-600 dark:text-sky-300 ring-sky-500/20",
  violet: "from-violet-500/25 via-violet-500/10 to-purple-500/20 text-violet-600 dark:text-violet-300 ring-violet-500/20",
  amber: "from-amber-500/25 via-amber-500/10 to-orange-500/20 text-amber-600 dark:text-amber-300 ring-amber-500/20",
  rose: "from-rose-500/25 via-rose-500/10 to-pink-500/20 text-rose-600 dark:text-rose-300 ring-rose-500/20",
  zinc: "from-zinc-500/25 via-zinc-500/10 to-slate-500/20 text-zinc-700 dark:text-zinc-300 ring-zinc-500/20",
};

export function StatCard({ label, value, change, icon, tone = "emerald" }: StatCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5.5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-white/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{label}</p>
          <p className="font-display mt-2.5 text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">{value}</p>
        </div>
        <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ring-1 transition-transform duration-300 group-hover:scale-110", tones[tone])}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-300">{change}</p>
      </div>
    </article>
  );
}
