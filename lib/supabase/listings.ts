import { supabase, supabaseAdmin } from "../supabase";
import type { Listing } from "@/types/listing";

export async function getListings(): Promise<Listing[]> {
  const client = supabaseAdmin || supabase;
  if (!client) {
    throw new Error("Supabase is not configured. Check the project URL and API key.");
  }

  const listings: Listing[] = [];
  const pageSize = 1000;
  let offset = 0;

  // Continue until an empty page, including when the API caps batches below pageSize.
  while (true) {
    const { data, error } = await client
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(offset, offset + pageSize - 1)
      .abortSignal(AbortSignal.timeout(15000));

    if (error) {
      throw new Error(`Unable to load spare parts: ${error.message}`);
    }
    if (!data?.length) break;

    listings.push(...data.map((listing) => ({
      ...listing,
      quantity: Number(listing.quantity ?? listing.stock_quantity ?? listing.stock ?? (listing.is_available === false ? 0 : 1)),
    } as Listing)));
    offset += data.length;
  }

  return listings;
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
