import type { CustomerProfile } from "./columns";
import { getAvatarInitials, formatJoinedDate, formatRating, getRoleBadgeClass, getFeedbackProgressWidth } from "./columns";
import { EyeIcon, EditIcon, TrashIcon } from "@/components/ui/icons";

interface CustomerRowProps {
  customer: CustomerProfile;
  onView: (customer: CustomerProfile) => void;
  onEdit: (customer: CustomerProfile) => void;
  onDelete: (customer: CustomerProfile) => void;
}

export function CustomerRow({ customer, onView, onEdit, onDelete }: CustomerRowProps) {
  const feedbackWidth = getFeedbackProgressWidth(customer.positive_feedback);

  return (
    <tr className="transition hover:bg-zinc-50 dark:hover:bg-zinc-900/70">
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center gap-3">
          {customer.avatar_url ? (
            <img
              src={customer.avatar_url}
              alt={`${customer.name} avatar`}
              className="h-11 w-11 rounded-2xl object-cover ring-1 ring-zinc-200 dark:ring-white/10"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-black text-white dark:bg-white dark:text-zinc-950">
              {getAvatarInitials(customer.name)}
            </div>
          )}
          <div>
            <div className="font-semibold text-zinc-950 dark:text-white">{customer.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{customer.phone}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeClass(customer.role)}`}>
          {customer.role}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="min-w-[120px]">
          <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">{customer.positive_feedback}</div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: feedbackWidth }} />
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-900 dark:text-white">{formatRating(customer.seller_avg_rating)}</td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-500 dark:text-zinc-400">{formatJoinedDate(customer.created_at)}</td>
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={() => onView(customer)} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-sky-500 dark:hover:text-sky-300">
            <EyeIcon className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => onEdit(customer)} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-600 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:text-emerald-300">
            <EditIcon className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => onDelete(customer)} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-600 transition hover:border-rose-300 hover:text-rose-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-rose-500 dark:hover:text-rose-300">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
