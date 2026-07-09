"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-zinc-200/80 px-4 py-4 text-sm dark:border-white/10 sm:flex-row">
      <span className="text-zinc-500 dark:text-zinc-400">
        Page {page} of {pageCount}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
          Previous
        </Button>
        <Button variant="ghost" onClick={() => onPageChange(Math.min(pageCount, page + 1))} disabled={page === pageCount}>
          Next
        </Button>
      </div>
    </div>
  );
}
