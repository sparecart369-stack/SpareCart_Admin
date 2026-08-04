import type { Listing } from "@/types/listing";
import { EditIcon, TrashIcon } from "@/components/ui/icons";

interface Props {
  listing: Listing;
  onEdit?: (listing: Listing) => void;
  onDelete?: (listing: Listing) => void;
}

export function ListingCard({ listing, onEdit, onDelete }: Props) {
  const formattedPrice =
    typeof listing.price === "number" && listing.price > 0
      ? `₹${listing.price.toLocaleString("en-IN")}`
      : "Contact for Price";

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white truncate" title={listing.name}>
            {listing.name || "Spare Part"}
          </h2>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              listing.is_available !== false
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
            }`}
          >
            {listing.is_available !== false ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="mt-2 text-xl font-bold text-emerald-600 dark:text-emerald-400">
          {formattedPrice}
        </p>

        <div className="mt-4 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
          <div className="flex justify-between border-b border-zinc-100 pb-1 dark:border-zinc-800/80">
            <span className="font-semibold text-zinc-500 dark:text-zinc-400">Category:</span>
            <span>{listing.category || "General"}</span>
          </div>

          {(listing.make || listing.model) && (
            <div className="flex justify-between border-b border-zinc-100 pb-1 dark:border-zinc-800/80">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">Vehicle:</span>
              <span>
                {listing.make || ""} {listing.model || ""}
              </span>
            </div>
          )}

          {listing.year ? (
            <div className="flex justify-between border-b border-zinc-100 pb-1 dark:border-zinc-800/80">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">Year:</span>
              <span>{listing.year}</span>
            </div>
          ) : null}

          {listing.condition ? (
            <div className="flex justify-between border-b border-zinc-100 pb-1 dark:border-zinc-800/80">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">Condition:</span>
              <span className="capitalize">{listing.condition}</span>
            </div>
          ) : null}

          {listing.seller_rating ? (
            <div className="flex justify-between border-b border-zinc-100 pb-1 dark:border-zinc-800/80">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">Seller Rating:</span>
              <span>⭐ {listing.seller_rating}</span>
            </div>
          ) : null}
        </div>

        {listing.description && (
          <p className="mt-3 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
            {listing.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Added {new Date(listing.created_at).toLocaleDateString()}</span>
        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(listing)}
              className="rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              title="Edit Product"
            >
              <EditIcon className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(listing)}
              className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
              title="Delete Product"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
