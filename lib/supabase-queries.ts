import { supabase } from "@/lib/supabase";
import { probeSupabaseConnection } from "@/lib/supabase/connection-check";
import type { SparePart } from "@/types/admin";

/**
 * Test Supabase connection
 */
export async function testSupabaseConnection() {
  try {
    const result = await probeSupabaseConnection();
    if (result.connected) {
      console.log("✅ Supabase connection successful!");
    } else {
      console.error("❌ Supabase connection failed:", result.error);
    }
    return result;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("❌ Supabase connection error:", errorMessage);
    return { connected: false, error: errorMessage };
  }
}

/**
 * Fetch spare parts from Supabase
 */
export async function fetchSpareParts(): Promise<SparePart[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("spare_parts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    image: item.image || "",
    name: item.name || "Unknown",
    brand: item.brand || "General",
    model: item.model || "Standard",
    category: item.category || "General",
    price: item.price || 0,
    seller: item.seller || "Unknown",
    status:
      item.status === "Out of Stock"
        ? "Out of Stock"
        : item.status === "Low Stock"
        ? "Low Stock"
        : "In Stock",
    dateAdded: item.date_added
      ? new Date(item.date_added).toLocaleDateString()
      : new Date(item.created_at).toLocaleDateString(),
  }));
}

/**
 * Fetch customers from Supabase
 */
export async function fetchCustomers() {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching customers:", err);
    return [];
  }
}

/**
 * Fetch sellers from Supabase
 */
export async function fetchSellers() {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("sellers")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching sellers:", err);
    return [];
  }
}

/**
 * Fetch orders from Supabase
 */
export async function fetchOrders() {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching orders:", err);
    return [];
  }
}

/**
 * Fetch product listings from Supabase
 */
export async function fetchListings() {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("listings")
      .select("id, name, category, price, status, created_at, seller_rating")
      .eq("is_admin_listing", false)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    // Transform listings to SparePart format
    return (data || []).map((listing: any) => ({
      id: listing.id,
      image: "",
      name: listing.name,
      brand: listing.category || "Unknown",
      model: "Standard",
      category: listing.category || "General",
      price: listing.price || 0,
      seller: `Seller (${listing.seller_rating || 0})`,
      status: listing.status === "active" ? "In Stock" : "Out of Stock",
      dateAdded: new Date(listing.created_at).toLocaleDateString(),
    }));
  } catch (err) {
    console.error("Error fetching listings:", err);
    return [];
  }
}
