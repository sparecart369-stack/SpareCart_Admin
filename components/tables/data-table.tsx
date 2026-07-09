"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { EditIcon, EyeIcon, SearchIcon, TrashIcon } from "@/components/ui/icons";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  title: string;
  data: T[];
  columns: Column<T>[];
  searchKeys: Array<keyof T>;
  filters?: Array<{ label: string; value: string }>;
  filterKey?: keyof T;
  addAction?: ReactNode;
  showView?: boolean;
}

export function DataTable<T extends { id: string }>({
  title,
  data,
  columns,
  searchKeys,
  filters = [],
  filterKey,
  addAction,
  showView = false,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.filter((item) => {
      const matchesQuery =
        !normalized ||
        searchKeys.some((key) =>
          String(item[key])
            .toLowerCase()
            .includes(normalized),
        );
      const matchesFilter = filter === "All" || !filterKey || String(item[filterKey]) === filter;
      return matchesQuery && matchesFilter;
    });
  }, [data, filter, filterKey, query, searchKeys]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateFilter(value: string) {
    setFilter(value);
    setPage(1);
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/75 shadow-xl shadow-zinc-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <div className="flex flex-col gap-3 border-b border-zinc-200/80 p-4 dark:border-white/10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-black text-zinc-950 dark:text-white">{title}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{filtered.length} records</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex h-11 min-w-0 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 sm:min-w-72">
            <SearchIcon className="h-4 w-4 shrink-0" />
            <input
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-zinc-400"
              placeholder="Search records"
              aria-label={`Search ${title}`}
            />
          </label>
          {filters.length > 0 && (
            <select
              value={filter}
              onChange={(event) => updateFilter(event.target.value)}
              className="h-11 rounded-2xl border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-700 outline-none dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200"
              aria-label={`Filter ${title}`}
            >
              <option>All</option>
              {filters.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          )}
          {addAction}
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="p-4">
          <EmptyState />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200/80 text-xs uppercase tracking-wide text-zinc-400 dark:border-white/10">
                {columns.map((column) => (
                  <th key={column.key} className={cn("px-4 py-3 font-black", column.className)}>
                    {column.header}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/70 dark:divide-white/10">
              {paged.map((item) => (
                <tr key={item.id} className="transition hover:bg-white/70 dark:hover:bg-white/5">
                  {columns.map((column) => (
                    <td key={column.key} className={cn("px-4 py-4 align-middle text-zinc-700 dark:text-zinc-200", column.className)}>
                      {column.render(item)}
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-1">
                      {showView && (
                        <Button variant="ghost" className="h-9 w-9 rounded-xl p-0" aria-label={`View ${item.id}`}>
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" className="h-9 w-9 rounded-xl p-0" aria-label={`Edit ${item.id}`}>
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-9 w-9 rounded-xl p-0 text-rose-600 dark:text-rose-300"
                        aria-label={`Delete ${item.id}`}
                        onClick={() => setDeleteTarget(item)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete record?"
        description={`This will remove ${deleteTarget?.id ?? "this record"} from the current dashboard view. Dummy data will reset on refresh.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
      />
    </section>
  );
}
