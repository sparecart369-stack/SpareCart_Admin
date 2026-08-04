import { supabase, supabaseAdmin } from "../supabase";
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
];

export async function getListings(): Promise<Listing[]> {
  const client = supabaseAdmin || supabase;
  if (!client) {
    console.warn("Supabase is not configured. Returning fallback listings.");
    return fallbackListings;
  }

  try {
    const { data, error } = await client
      .from("listings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      const message = error.message || JSON.stringify(error);
      console.warn("Supabase getListings error. Returning fallback listings:", message);
      return fallbackListings;
    }

    return (data && data.length > 0) ? data : fallbackListings;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn("getListings unexpected error. Returning fallback listings:", message);
    return fallbackListings;
  }
}

export async function updateListing(
  id: string,
  updates: Partial<Listing>
): Promise<{ success: boolean; error?: string }> {
  const client = supabaseAdmin || supabase;
  if (!client) {
    return { success: false, error: "Supabase client is not initialized." };
  }

  try {
    const { error } = await client
      .from("listings")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

export async function deleteListing(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const client = supabaseAdmin || supabase;
  if (!client) {
    return { success: false, error: "Supabase client is not initialized." };
  }

  try {
    const { error } = await client.from("listings").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

export async function createListing(
  listing: Partial<Listing>
): Promise<{ success: boolean; data?: Listing; error?: string }> {
  const client = supabaseAdmin || supabase;
  if (!client) {
    return { success: false, error: "Supabase client is not initialized." };
  }

  try {
    const { data, error } = await client
      .from("listings")
      .insert([
        {
          ...listing,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
