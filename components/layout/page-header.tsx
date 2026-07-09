import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">Admin Control</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description}</p>
      </div>
      {action}
    </div>
  );
}
