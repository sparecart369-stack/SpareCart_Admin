"use client";

import { sellers } from "@/data/admin-data";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable, type Column } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils";
import type { Seller } from "@/types/admin";

const columns: Column<Seller>[] = [
  { key: "shop", header: "Shop", render: (seller) => <span className="font-bold text-zinc-950 dark:text-white">{seller.shop}</span> },
  { key: "owner", header: "Owner", render: (seller) => seller.owner },
  { key: "products", header: "Products", render: (seller) => seller.products },
  { key: "rating", header: "Rating", render: (seller) => <span className="font-black text-amber-600 dark:text-amber-300">{seller.rating.toFixed(1)}</span> },
  { key: "revenue", header: "Revenue", render: (seller) => <span className="font-black">{formatCurrency(seller.revenue)}</span> },
  { key: "status", header: "Status", render: (seller) => <StatusBadge status={seller.status} /> },
];

export default function SellersPage() {
  return (
    <div className="animate-float-in">
      <PageHeader title="Sellers" description="Track seller shops, product depth, ratings, generated revenue, and verification status." />
      <DataTable
        title="Seller Network"
        data={sellers}
        columns={columns}
        searchKeys={["shop", "owner", "status"]}
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
