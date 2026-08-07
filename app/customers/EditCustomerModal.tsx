"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/components/ui/icons";
import type { CustomerProfile } from "./columns";

interface EditCustomerModalProps {
  open: boolean;
  mode: "view" | "edit" | "create";
  customer: CustomerProfile | null;
  onClose: () => void;
  onSave: (values: Partial<CustomerProfile>) => Promise<void>;
}

export function EditCustomerModal({ open, mode, customer, onClose, onSave }: EditCustomerModalProps) {
  const isReadOnly = mode === "view";
  const isCreate = mode === "create";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Buyer");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [positiveFeedback, setPositiveFeedback] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customer) {
      setName(customer.name ?? "");
      setPhone(customer.phone ?? "");
      setRole(customer.role ?? "Buyer");
      setAvatarUrl(customer.avatar_url ?? "");
      setPositiveFeedback(customer.positive_feedback ?? 0);
    } else {
      setName("");
      setPhone("");
      setRole("Buyer");
      setAvatarUrl("");
      setPositiveFeedback(0);
    }
    setError(null);
  }, [customer, open]);

  if (!open) return null;

  const title = isCreate ? "Add Customer" : isReadOnly ? "Customer Details" : "Edit Customer";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isReadOnly) {
      onClose();
      return;
    }

    if (!name.trim() || !phone.trim()) {
      setError("Name and phone are required.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await onSave({
        id: customer?.id,
        name: name.trim(),
        phone: phone.trim(),
        role: role || "Buyer",
        avatar_url: avatarUrl.trim(),
        positive_feedback: Number(positiveFeedback),
      });
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl shadow-zinc-950/20 dark:border-white/10 dark:bg-zinc-950">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white">{title}</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{isReadOnly ? "Review profile details." : "Update customer information in the admin dashboard."}</p>
          </div>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-zinc-200 text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isReadOnly}
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-300"
              />
            </label>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Phone
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                disabled={isReadOnly}
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-300"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Role
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                disabled={isReadOnly}
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-300"
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
              </select>
            </label>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Avatar URL
              <input
                value={avatarUrl}
                onChange={(event) => setAvatarUrl(event.target.value)}
                disabled={isReadOnly}
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-300"
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-zinc-900 dark:text-white">
            Positive Feedback
            <input
              type="number"
              min={0}
              step={1}
              value={positiveFeedback}
              onChange={(event) => setPositiveFeedback(Number(event.target.value))}
              disabled={isReadOnly}
              className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-300"
            />
          </label>

          {error ? <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p> : null}

          <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant={isReadOnly ? "secondary" : "primary"} disabled={saving}>
              {isReadOnly ? "Close" : isCreate ? "Create Customer" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
