"use client";

import { customers } from "@/data/admin-data";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable, type Column } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, initials } from "@/lib/utils";
import type { Customer } from "@/types/admin";

const columns: Column<Customer>[] = [
  {
    key: "avatar",
    header: "Avatar",
    render: (customer) => (
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-xs font-black text-white">
        {initials(customer.name)}
      </span>
    ),
  },
  { key: "name", header: "Name", render: (customer) => <span className="font-bold text-zinc-950 dark:text-white">{customer.name}</span> },
  { key: "email", header: "Email", render: (customer) => customer.email },
  { key: "phone", header: "Phone", render: (customer) => customer.phone },
  { key: "address", header: "Address", render: (customer) => <span className="line-clamp-1">{customer.address}</span> },
  { key: "totalOrders", header: "Total Orders", render: (customer) => customer.totalOrders },
  { key: "totalPurchase", header: "Total Purchase", render: (customer) => <span className="font-black">{formatCurrency(customer.totalPurchase)}</span> },
  { key: "status", header: "Status", render: (customer) => <StatusBadge status={customer.status} /> },
];

export default function CustomersPage() {
  return (
    <div className="animate-float-in">
      <PageHeader title="Customers" description="Manage buyer profiles, purchase value, contact details, and account status." />
      <DataTable
        title="Customer Directory"
        data={customers}
        columns={columns}
        searchKeys={["name", "email", "phone", "address", "status"]}
        filterKey="status"
        filters={[
          { label: "Active", value: "Active" },
          { label: "Pending", value: "Pending" },
          { label: "Suspended", value: "Suspended" },
        ]}
      />
    </div>
  );
}
