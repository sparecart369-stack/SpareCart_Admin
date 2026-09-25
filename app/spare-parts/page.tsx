import { connection } from "next/server";
import { SparePartsView } from "@/components/spare-parts-table-view";
import { getListings } from "@/lib/supabase/listings";
import type { Listing } from "@/types/listing";

export const metadata = {
  title: "Spare Parts",
};

async function loadListings() {
  try {
    return { listings: await getListings(), error: null };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error loading spare parts listings:", errorMessage);
    return { listings: [] as Listing[], error: errorMessage };
  }
}

export default async function SparePartsPage() {
  await connection();
  const { listings, error } = await loadListings();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold">Spare Parts</h1>

      <p className="mt-2 text-gray-500">Browse all spare parts.</p>

      {error ? (
        <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          <p className="font-semibold">Unable to load listings.</p>
          <p>{error}</p>
        </div>
      ) : null}

      {!error ? (
        <div className="mt-8">
          <SparePartsView listings={listings} />
        </div>
      ) : null}
    </main>
  );
}
