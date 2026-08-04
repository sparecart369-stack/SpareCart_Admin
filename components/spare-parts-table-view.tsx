"use client";

import { useState } from "react";
import type { Listing } from "@/types/listing";
import { DataTable, type Column } from "@/components/tables/data-table";
import { ListingGrid } from "@/components/ListingGrid";
import { StatusBadge } from "@/components/ui/status-badge";

interface SparePartsViewProps {
  listings: Listing[];
}

export function SparePartsView({ listings }: SparePartsViewProps) {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Columns mapping all fields from Supabase `listings` table
  const columns: Column<Listing>[] = [
    {
      key: "name",
      header: "Part Name",
      render: (item) => (
        <div>
          <div className="font-bold text-zinc-900 dark:text-white">{item.name || "Unnamed"}</div>
          <div className="text-[11px] font-mono text-zinc-400">ID: {item.id.slice(0, 8)}...</div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category & Sub",
      render: (item) => (
        <div>
          <span className="inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {item.category || "General"}
          </span>
          {item.subcategory && (
            <div className="mt-0.5 text-xs text-zinc-400">{item.subcategory}</div>
          )}
        </div>
      ),
    },
    {
      key: "vehicle",
      header: "Vehicle Make/Model",
      render: (item) => (
        <div className="text-xs">
          <div className="font-medium text-zinc-800 dark:text-zinc-200">
            {item.make || "General"} {item.model || ""}
          </div>
          {item.year ? <div className="text-zinc-400">Year: {item.year}</div> : null}
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (item) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          {item.price ? `₹${item.price.toLocaleString("en-IN")}` : "₹0"}
        </span>
      ),
    },
    {
      key: "condition",
      header: "Condition",
      render: (item) => (
        <span className="capitalize text-xs font-medium text-zinc-600 dark:text-zinc-300">
          {item.condition || "Used"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status & Stock",
      render: (item) => (
        <div className="flex flex-col gap-1">
          <StatusBadge status={item.status === "active" ? "Active" : item.status || "Inactive"} />
          <span
            className={`text-[11px] font-semibold ${
              item.is_available !== false
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {item.is_available !== false ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      ),
    },
    {
      key: "fulfillment",
      header: "Fulfillment & Location",
      render: (item) => (
        <div className="max-w-[200px] text-xs">
          <div className="capitalize text-zinc-700 dark:text-zinc-300">
            {(item.fulfillment || "doorstep_delivery").replace(/_/g, " ")}
          </div>
          {item.location && (
            <div className="truncate text-zinc-400" title={item.location}>
              📍 {item.location}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "numbers",
      header: "Part / Chassis #",
      render: (item) => (
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div>Part: {item.part_number || "—"}</div>
          <div>Chassis: {item.chassis_number || "—"}</div>
        </div>
      ),
    },
    {
      key: "rating",
      header: "Seller Rating",
      render: (item) => (
        <div className="text-xs text-zinc-700 dark:text-zinc-300">
          ⭐ {item.seller_rating || 5.0}
        </div>
      ),
    },
    {
      key: "created_at",
      header: "Created Date",
      render: (item) => (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const categories = Array.from(new Set(listings.map((l) => l.category).filter(Boolean)));
  const filterOptions = categories.map((cat) => ({ label: cat, value: cat }));

  return (
    <div className="space-y-6">
      {/* View Mode Toggle Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Fetching all {listings.length} columns & records directly from your Supabase <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-emerald-600 dark:bg-zinc-800 dark:text-emerald-400">listings</code> table.
          </p>
        </div>

        <div className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
              viewMode === "table"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            📋 Full Table View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
              viewMode === "grid"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            🎴 Card Grid View
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <DataTable
          title="Supabase Products Table (listings)"
          data={listings}
          columns={columns}
          searchKeys={["name", "category", "make", "model", "location", "part_number"]}
          filters={filterOptions}
          filterKey="category"
          showView={true}
        />
      ) : (
        <ListingGrid listings={listings} />
      )}
    </div>
  );
}
