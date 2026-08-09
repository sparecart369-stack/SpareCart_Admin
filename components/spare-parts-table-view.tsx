"use client";

import { useState } from "react";
import type { Listing } from "@/types/listing";
import { DataTable, type Column } from "@/components/tables/data-table";
import { ListingGrid } from "@/components/ListingGrid";
import { StatusBadge } from "@/components/ui/status-badge";
import { EditListingModal } from "@/components/edit-listing-modal";
import { updateListing, deleteListing } from "@/lib/supabase/listings";

interface SparePartsViewProps {
  listings: Listing[];
}

export function SparePartsView({ listings: initialListings }: SparePartsViewProps) {
  const [items, setItems] = useState<Listing[]>(initialListings);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  }

  function handleOpenEdit(item: Listing) {
    setEditingListing(item);
    setIsModalOpen(true);
  }

  async function handleDelete(item: Listing) {
    const res = await deleteListing(item.id);
    if (res.success) {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast(`Successfully deleted part "${item.name}"`);
    } else {
      alert(`Failed to delete listing: ${res.error}`);
    }
  }

  async function handleSaveListing(formData: Partial<Listing>) {
    if (!editingListing) {
      return;
    }

    const res = await updateListing(editingListing.id, formData);
    if (res.success) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingListing.id ? ({ ...i, ...formData } as Listing) : i))
      );
      showToast(`Updated "${formData.name || editingListing.name}" successfully!`);
    } else {
      throw new Error(res.error || "Failed to update listing");
    }
  }

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

  const categories = Array.from(new Set(items.map((l) => l.category).filter(Boolean)));
  const filterOptions = categories.map((cat) => ({ label: cat, value: cat }));

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-2xl animate-bounce">
          ✅ {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Managing {items.length} records connected to Supabase <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-emerald-600 dark:bg-zinc-800 dark:text-emerald-400">listings</code> database table.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
      </div>

      {viewMode === "table" ? (
        <DataTable
          title="Supabase Products Table (listings)"
          data={items}
          columns={columns}
          searchKeys={["name", "category", "make", "model", "location", "part_number"]}
          filters={filterOptions}
          filterKey="category"
          showView={true}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      ) : (
        <ListingGrid listings={items} onEdit={handleOpenEdit} onDelete={handleDelete} />
      )}

      <EditListingModal
        isOpen={isModalOpen}
        listing={editingListing}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveListing}
      />
    </div>
  );
}
