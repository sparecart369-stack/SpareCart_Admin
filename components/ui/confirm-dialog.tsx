"use client";

import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  confirming?: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  confirming = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl shadow-zinc-950/20 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/90">
        <h2 className="text-lg font-bold text-zinc-950 dark:text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" onClick={onCancel} variant="secondary" disabled={confirming}>
            Cancel
          </Button>
          <Button type="button" onClick={() => void onConfirm()} variant="danger" disabled={confirming}>
            {confirming ? "Deleting…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
