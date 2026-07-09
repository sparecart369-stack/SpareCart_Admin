import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function GlassCard({ title, subtitle, children, className }: GlassCardProps) {
  return (
    <section className={cn("rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-zinc-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10", className)}>
      {(title || subtitle) && (
        <div className="mb-5">
          {title && <h3 className="text-base font-black text-zinc-950 dark:text-white">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
