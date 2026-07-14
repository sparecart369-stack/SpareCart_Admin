"use client";

import { useEffect, useState } from "react";
import { spareParts as mockSpareParts } from "@/data/admin-data";
import { PageHeader } from "@/components/layout/page-header";
import { DataTable, type Column } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import type { SparePart } from "@/types/admin";

const columns: Column<SparePart>[] = [
  {
    key: "image",
    header: "Image",
    render: (part) => (
      <div className="grid h-12 w-14 place-items-center rounded-2xl bg-gradient-to-br from-zinc-900 via-emerald-700 to-sky-600 text-xs font-black text-white shadow-lg shadow-zinc-950/10">
        {part.name.slice(0, 2).toUpperCase()}
      </div>
    ),
  },
  { key: "name", header: "Product Name", render: (part) => <span className="font-bold text-zinc-950 dark:text-white">{part.name}</span> },
  { key: "brand", header: "Category", render: (part) => part.brand },
  { key: "model", header: "Type", render: (part) => part.model },
  { key: "category", header: "Category", render: (part) => part.category },
  { key: "price", header: "Price", render: (part) => <span className="font-black">{formatCurrency(part.price)}</span> },
  { key: "seller", header: "Seller", render: (part) => part.seller },
  { key: "status", header: "Status", render: (part) => <StatusBadge status={part.status} /> },
  { key: "dateAdded", header: "Date Added", render: (part) => part.dateAdded },
];

export default function SparePartsPage() {
  const [spareParts, setSpareParts] = useState<SparePart[]>(mockSpareParts);
  const [isFromSupabase, setIsFromSupabase] = useState(false);

  useEffect(() => {
    getListings();
  }, []);

  async function getListings() {
    try {
      console.log("Fetching listings from Supabase...");
      
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Supabase Error:", error.message, error.details);
        setSpareParts(mockSpareParts);
        setIsFromSupabase(false);
      } else if (data && data.length > 0) {
        console.log("✅ Supabase Connected! Fetched", data.length, "listings");
        
        // Transform Supabase data to SparePart format
        const transformedData = data.map((item: any) => ({
          id: item.id,
          image: item.image_url || "",
          name: item.name || "Unknown",
          brand: item.category || "General",
          model: item.condition || "Standard",
          category: item.category || "General",
          price: item.price || 0,
          seller: item.seller_id ? `Seller ${item.seller_id}` : "Unknown",
          status: item.status === "active" ? "In Stock" : "Out of Stock",
          dateAdded: new Date(item.created_at).toLocaleDateString(),
        }));
        
        setSpareParts(transformedData);
        setIsFromSupabase(true);
      } else {
        console.warn("⚠️ No listings found on Supabase, using mock data");
        setSpareParts(mockSpareParts);
        setIsFromSupabase(false);
      }
    } catch (err) {
      console.error("❌ Error fetching listings:", err);
      setSpareParts(mockSpareParts);
      setIsFromSupabase(false);
    }
  }

  return (
    <div className="animate-float-in">
      <PageHeader
        title="Spare Parts"
        description="Review listings, inventory condition, sellers, pricing, and category coverage across the marketplace."
      />
      
      {!isFromSupabase && (
        <div className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          ⚠️ Showing mock data. Check browser console for connection details.
        </div>
      )}
      
      {isFromSupabase && (
        <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
          ✅ Connected to Supabase - Displaying live listings
        </div>
      )}
      
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
        showView
      />
    </div>
  );
}
