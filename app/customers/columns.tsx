export type CustomerRole = "Buyer" | "Seller" | string;

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  role: CustomerRole;
  avatar_url: string;
  positive_feedback: number;
  created_at: string;
  seller_avg_rating: number | null;
  seller_rating_count: number | null;
}

export const roleOptions = [
  { value: "All", label: "All" },
  { value: "Buyer", label: "Buyer" },
  { value: "Seller", label: "Seller" },
] as const;

export const pageSizeOptions = [10, 25, 50, 100] as const;

export function getAvatarInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase())
    .join("");
}

export function formatJoinedDate(createdAt: string) {
  try {
    return new Date(createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return createdAt;
  }
}

export function formatRating(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) {
    return "--";
  }

  return `${value.toFixed(1)} ⭐`;
}

export function getRoleBadgeClass(role: string) {
  if (role.toLowerCase() === "seller") {
    return "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300";
  }

  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
}

export function getFeedbackProgressWidth(feedback: number) {
  const normalized = Number.isFinite(feedback) ? feedback : 0;
  if (normalized <= 10) {
    return `${Math.round(normalized * 10)}%`;
  }
  return `${Math.min(100, Math.round(normalized))}%`;
}
