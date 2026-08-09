"use server";

import { createSupabaseClient } from "@/lib/supabase/client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { CustomerProfile } from "./columns";

function getProfilesClient() {
  return createSupabaseAdminClient() || createSupabaseClient();
}

function getAdminClient() {
  return createSupabaseAdminClient();
}

function normalizeProfile(item: Record<string, unknown>): CustomerProfile {
  return {
    id: String(item.id ?? ""),
    name: String(item.name ?? ""),
    phone: String(item.phone ?? ""),
    role: String(item.role ?? "Buyer"),
    avatar_url: String(item.avatar_url ?? ""),
    positive_feedback: item.positive_feedback == null ? 0 : Number(item.positive_feedback),
    created_at: item.created_at ? new Date(String(item.created_at)).toString() : new Date().toString(),
    seller_avg_rating: item.seller_avg_rating == null ? null : Number(item.seller_avg_rating),
    seller_rating_count: item.seller_rating_count == null ? null : Number(item.seller_rating_count),
  };
}

export async function fetchProfiles(): Promise<CustomerProfile[]> {
  const client = getProfilesClient();
  if (!client) {
    return [];
  }

  try {
    const primarySelect = "id, name, phone, role, avatar_url, positive_feedback, created_at, seller_avg_rating, seller_rating_count";
    const fallbackSelect = "id, name, phone, role, avatar_url, created_at";

    let data: Array<Record<string, unknown>> | null = null;
    let error = null;

    const primaryResult = await client
      .from("profiles")
      .select(primarySelect)
      .order("created_at", { ascending: false });

    data = primaryResult.data;
    error = primaryResult.error;

    if (error?.code === "42703") {
      const fallbackResult = await client.from("profiles").select(fallbackSelect).order("created_at", { ascending: false });
      data = fallbackResult.data;
      error = fallbackResult.error;
    }

    if (error) {
      console.error("Supabase fetchProfiles error:", error);
      return [];
    }

    return (data || []).map(normalizeProfile);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    return [];
  }
}

export interface ProfileActionResult<T> {
  data: T | null;
  error?: string;
}

export async function createProfile(values: Partial<CustomerProfile>): Promise<ProfileActionResult<CustomerProfile>> {
  const client = getProfilesClient();
  if (!client) {
    return { data: null, error: "Supabase client is not configured." };
  }

  try {
    const payload = {
      name: values.name ?? "",
      phone: values.phone ?? "",
      role: values.role ?? "Buyer",
      avatar_url: values.avatar_url ?? "",
      created_at: new Date().toISOString(),
    };

    const { data, error } = await client.from("profiles").insert([payload]).select().single();

    if (error) {
      console.error("Supabase createProfile error:", error);
      return { data: null, error: error.message };
    }

    return { data: normalizeProfile(data) };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error creating profile:", err);
    return { data: null, error: message };
  }
}

export async function updateProfile(id: string, values: Partial<CustomerProfile>): Promise<ProfileActionResult<CustomerProfile>> {
  const client = getProfilesClient();
  if (!client) {
    return { data: null, error: "Supabase client is not configured." };
  }

  try {
    const payload: Record<string, unknown> = {};

    if (typeof values.name === "string") payload.name = values.name;
    if (typeof values.phone === "string") payload.phone = values.phone;
    if (typeof values.role === "string") payload.role = values.role;
    if (typeof values.avatar_url === "string") payload.avatar_url = values.avatar_url;

    const { data, error } = await client
      .from("profiles")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase updateProfile error:", error);
      return { data: null, error: error.message };
    }

    return { data: normalizeProfile(data) };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error updating profile:", err);
    return { data: null, error: message };
  }
}

export async function deleteProfile(id: string): Promise<ProfileActionResult<boolean>> {
  const trimmedId = id?.trim();
  if (!trimmedId) {
    return { data: null, error: "Invalid customer id." };
  }

  const admin = getAdminClient();
  if (!admin) {
    return {
      data: null,
      error: "Admin delete requires SUPABASE_SERVICE_ROLE_KEY in .env.local. Restart the dev server after adding it.",
    };
  }

  try {
    let { data, error } = await admin.from("profiles").delete().eq("id", trimmedId).select("id");

    if (error?.code === "23503") {
      const { error: listingsError } = await admin.from("listings").delete().eq("seller_id", trimmedId);
      if (listingsError && listingsError.code !== "42P01") {
        console.error("Supabase deleteProfile listings cleanup error:", listingsError);
        return {
          data: null,
          error: "Cannot delete this customer because related listings or orders still exist.",
        };
      }
      ({ data, error } = await admin.from("profiles").delete().eq("id", trimmedId).select("id"));
    }

    if (error) {
      console.error("Supabase deleteProfile error:", error);
      if (error.code === "23503") {
        return {
          data: null,
          error: "Cannot delete this customer because other tables still reference this profile.",
        };
      }
      return { data: null, error: error.message };
    }
    if (!data?.length) {
      return { data: null, error: "No customer was deleted. The profile may not exist or the id did not match." };
    }
    return { data: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error deleting profile:", err);
    return { data: null, error: message };
  }
}
