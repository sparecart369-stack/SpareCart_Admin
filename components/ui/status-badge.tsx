import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  Paid: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  Delivered: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  "In Stock": "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  Pending: "bg-amber-500/15 text-amber-700 ring-amber-500/20 dark:text-amber-300",
  Processing: "bg-sky-500/15 text-sky-700 ring-sky-500/20 dark:text-sky-300",
  Packed: "bg-sky-500/15 text-sky-700 ring-sky-500/20 dark:text-sky-300",
  "In Transit": "bg-sky-500/15 text-sky-700 ring-sky-500/20 dark:text-sky-300",
  "Low Stock": "bg-orange-500/15 text-orange-700 ring-orange-500/20 dark:text-orange-300",
  Suspended: "bg-rose-500/15 text-rose-700 ring-rose-500/20 dark:text-rose-300",
  Cancelled: "bg-rose-500/15 text-rose-700 ring-rose-500/20 dark:text-rose-300",
  Failed: "bg-rose-500/15 text-rose-700 ring-rose-500/20 dark:text-rose-300",
  "Out of Stock": "bg-zinc-500/15 text-zinc-700 ring-zinc-500/20 dark:text-zinc-300",
  Refunded: "bg-violet-500/15 text-violet-700 ring-violet-500/20 dark:text-violet-300",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        statusStyles[status] ?? "bg-zinc-500/15 text-zinc-700 ring-zinc-500/20",
      )}
    >
      {status}
    </span>
  );
}
