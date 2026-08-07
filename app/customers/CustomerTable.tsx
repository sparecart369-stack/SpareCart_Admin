import type { CustomerProfile } from "./columns";
import { CustomerRow } from "./CustomerRow";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

interface CustomerTableProps {
  customers: CustomerProfile[];
  loading: boolean;
  page: number;
  pageSize: number;
  onView: (customer: CustomerProfile) => void;
  onEdit: (customer: CustomerProfile) => void;
  onDelete: (customer: CustomerProfile) => void;
}

export function CustomerTable({ customers, loading, page, pageSize, onView, onEdit, onDelete }: CustomerTableProps) {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (customers.length === 0) {
    return <EmptyState title="No customers found" description="Try adjusting your search or filters." />;
  }

  const startIndex = (page - 1) * pageSize;
  const pageData = customers.slice(startIndex, startIndex + pageSize);

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm shadow-zinc-100 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-none">
      <table className="min-w-full border-separate border-spacing-0 text-left">
        <thead className="bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-4 font-semibold">Customer</th>
            <th className="px-4 py-4 font-semibold">Role</th>
            <th className="px-4 py-4 font-semibold">Positive Feedback</th>
            <th className="px-4 py-4 font-semibold">Rating</th>
            <th className="px-4 py-4 font-semibold">Joined</th>
            <th className="px-4 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((customer) => (
            <CustomerRow key={customer.id} customer={customer} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
