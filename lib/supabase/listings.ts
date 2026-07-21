import { supabase } from "./client";
import type { Listing } from "@/types/listing";

const fallbackListings: Listing[] = [
  {
    id: "fallback-listing-1",
    seller_id: "fallback-seller",
    name: "Turbocharger Assembly",
    category: "Engine",
    make: "Hyundai",
    model: "i20",
    year: 2018,
    condition: "Used",
    price: 18500,
    location: "Bengaluru",
    description: "High-quality turbocharger assembly tested for reliable performance.",
    fulfillment: "Same day dispatch",
    pickup_address: "No. 12, Electronic City",
    status: "active",
    is_admin_listing: false,
    seller_rating: 4.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    chassis_number: "CHS-1001",
    part_number: "PT-1001",
    is_available: true,
  },
  {
    id: "fallback-listing-2",
    seller_id: "fallback-seller",
    name: "Front Brake Caliper",
    category: "Brakes",
    make: "Maruti Suzuki",
    model: "Swift",
    year: 2020,
    condition: "Used",
    price: 9200,
    location: "Mumbai",
    description: "Refurbished caliper with smooth braking response and quick installation.",
    fulfillment: "Next day dispatch",
    pickup_address: "Plot 44, Andheri East",
    status: "active",
    is_admin_listing: false,
    seller_rating: 4.6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    chassis_number: "CHS-1002",
    part_number: "PT-1002",
    is_available: true,
  },
];

export async function getListings(): Promise<Listing[]> {
  if (!supabase) {
    console.warn("Supabase is not configured. Returning fallback listings.");
    return fallbackListings;
  }

  try {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("status", "active")
      .eq("is_available", true)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      const message = error.message || JSON.stringify(error);
      console.warn("Supabase getListings error. Returning fallback listings:", message);
      return fallbackListings;
    }

    return data ?? fallbackListings;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn("getListings unexpected error. Returning fallback listings:", message);
    return fallbackListings;
  }
}
