import type { Listing } from "@/types/listing";
import { ListingCard } from "./ListingCard";

interface Props {
  listings: Listing[];
  onEdit?: (listing: Listing) => void;
  onDelete?: (listing: Listing) => void;
}

export function ListingGrid({ listings, onEdit, onDelete }: Props) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Spare Parts Found</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
