import { BoxIcon } from "@/components/ui/icons";

export function EmptyState({ title = "No results found", description = "Try adjusting your search or filters." }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300/80 bg-white/50 p-8 text-center dark:border-white/10 dark:bg-white/5">
      <BoxIcon className="h-10 w-10 text-zinc-400" />
      <h3 className="mt-4 text-sm font-bold text-zinc-950 dark:text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}
