import { ListingSkeleton } from "@/components/ListingSkeleton";

export default function Loading() {
  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <div className="h-10 w-56 rounded-full bg-zinc-200/70 dark:bg-zinc-700/70" />
        <div className="h-5 w-4/5 rounded-full bg-zinc-200/70 dark:bg-zinc-700/70" />
      </div>
      <ListingSkeleton />
    </div>
  );
}
