export function ListingSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl border border-white/60 bg-zinc-100/70 p-6 shadow-xl shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
          <div className="mb-4 h-48 rounded-3xl bg-zinc-300/70 dark:bg-zinc-700/70" />
          <div className="space-y-3">
            <div className="h-6 w-3/4 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
            <div className="h-5 w-1/3 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-16 rounded-3xl bg-zinc-300/70 dark:bg-zinc-700/70" />
              <div className="h-16 rounded-3xl bg-zinc-300/70 dark:bg-zinc-700/70" />
            </div>
            <div className="h-24 rounded-3xl bg-zinc-300/70 dark:bg-zinc-700/70" />
            <div className="h-10 w-32 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
          </div>
        </div>
      ))}
    </div>
  );
}
