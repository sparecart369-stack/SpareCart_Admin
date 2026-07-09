"use client";

import { orders } from "@/data/admin-data";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable, type Column } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "@/types/admin";

const columns: Column<Order>[] = [
  { key: "id", header: "Order ID", render: (order) => <span className="font-black text-zinc-950 dark:text-white">{order.id}</span> },
  { key: "customer", header: "Customer", render: (order) => order.customer },
  { key: "seller", header: "Seller", render: (order) => order.seller },
  { key: "product", header: "Product", render: (order) => <span className="line-clamp-1">{order.product}</span> },
  { key: "amount", header: "Amount", render: (order) => <span className="font-black">{formatCurrency(order.amount)}</span> },
  { key: "paymentStatus", header: "Payment Status", render: (order) => <StatusBadge status={order.paymentStatus} /> },
  { key: "deliveryStatus", header: "Delivery Status", render: (order) => <StatusBadge status={order.deliveryStatus} /> },
];

export default function OrdersPage() {
  return (
    <div className="animate-float-in">
      <PageHeader title="Orders" description="Monitor order flow, payment state, seller fulfillment, and delivery progress." />
      <DataTable
        title="Order Ledger"
        data={orders}
        columns={columns}
        searchKeys={["id", "customer", "seller", "product", "paymentStatus", "deliveryStatus"]}
        filterKey="paymentStatus"
        filters={[
          { label: "Paid", value: "Paid" },
          { label: "Pending", value: "Pending" },
          { label: "Refunded", value: "Refunded" },
          { label: "Failed", value: "Failed" },
        ]}
        showView
      />
    </div>
  );
}
