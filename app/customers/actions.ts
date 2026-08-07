import { supabase } from "@/lib/supabase";
import type { CustomerProfile } from "./columns";

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
  if (!supabase) {
    return [];
  }

  try {
    const primarySelect = "id, name, phone, role, avatar_url, positive_feedback, created_at, seller_avg_rating, seller_rating_count";
    const fallbackSelect = "id, name, phone, role, avatar_url, created_at";

    let data: Array<Record<string, unknown>> | null = null;
    let error = null;

    const primaryResult = await supabase
      .from("profiles")
      .select(primarySelect)
      .order("created_at", { ascending: false });

    data = primaryResult.data;
    error = primaryResult.error;

    if (error?.code === "42703") {
      const fallbackResult = await supabase.from("profiles").select(fallbackSelect).order("created_at", { ascending: false });
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
  if (!supabase) {
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

    const { data, error } = await supabase.from("profiles").insert([payload]).select().single();

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
  if (!supabase) {
    return { data: null, error: "Supabase client is not configured." };
  }

  try {
    const payload: Record<string, unknown> = {};

    if (typeof values.name === "string") payload.name = values.name;
    if (typeof values.phone === "string") payload.phone = values.phone;
    if (typeof values.role === "string") payload.role = values.role;
    if (typeof values.avatar_url === "string") payload.avatar_url = values.avatar_url;

    const { data, error } = await supabase
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

export async function deleteProfile(id: string): Promise<ProfileActionResult<null>> {
  if (!supabase) {
    return { data: null, error: "Supabase client is not configured." };
  }

  try {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteProfile error:", error);
      return { data: null, error: error.message };
    }
    return { data: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error deleting profile:", err);
    return { data: null, error: message };
  }
}
