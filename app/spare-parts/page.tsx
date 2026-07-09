"use client";

import { spareParts } from "@/data/admin-data";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable, type Column } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils";
import type { SparePart } from "@/types/admin";

const columns: Column<SparePart>[] = [
  {
    key: "image",
    header: "Image",
    render: (part) => (
      <div className="grid h-12 w-14 place-items-center rounded-2xl bg-gradient-to-br from-zinc-900 via-emerald-700 to-sky-600 text-xs font-black text-white shadow-lg shadow-zinc-950/10">
        {part.brand.slice(0, 2).toUpperCase()}
      </div>
    ),
  },
  { key: "name", header: "Product Name", render: (part) => <span className="font-bold text-zinc-950 dark:text-white">{part.name}</span> },
  { key: "brand", header: "Vehicle Brand", render: (part) => part.brand },
  { key: "model", header: "Vehicle Model", render: (part) => part.model },
  { key: "category", header: "Category", render: (part) => part.category },
  { key: "price", header: "Price", render: (part) => <span className="font-black">{formatCurrency(part.price)}</span> },
  { key: "seller", header: "Seller", render: (part) => part.seller },
  { key: "status", header: "Status", render: (part) => <StatusBadge status={part.status} /> },
  { key: "dateAdded", header: "Date Added", render: (part) => part.dateAdded },
];

export default function SparePartsPage() {
  return (
    <div className="animate-float-in">
      <PageHeader
        title="Spare Parts"
        description="Review listings, inventory condition, sellers, pricing, and category coverage across the marketplace."
        action={
          <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />}>
            Add Product
          </Button>
        }
      />
      <DataTable
        title="Product Inventory"
        data={spareParts}
        columns={columns}
        searchKeys={["name", "brand", "model", "category", "seller", "status"]}
        filterKey="status"
        filters={[
          { label: "In Stock", value: "In Stock" },
          { label: "Low Stock", value: "Low Stock" },
          { label: "Out of Stock", value: "Out of Stock" },
        ]}
        addAction={
          <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />}>
            Add Product
          </Button>
        }
        showView
      />
    </div>
  );
}
