import type { Listing } from "@/types/listing";

interface Props {
  listing: Listing;
}

export function ListingCard({ listing }: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">{listing.name}</h2>

      <p className="mt-3 text-2xl font-bold text-green-600">₹{listing.price}</p>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <strong>Category:</strong> {listing.category}
        </p>

        <p>
          <strong>Vehicle:</strong> {listing.make} {listing.model}
        </p>

        <p>
          <strong>Year:</strong> {listing.year}
        </p>

        <p>
          <strong>Condition:</strong> {listing.condition}
        </p>

        <p>
          <strong>Location:</strong> {listing.location}
        </p>

        <p>
          <strong>Seller Rating:</strong> ⭐ {listing.seller_rating}
        </p>
      </div>

      <p className="mt-4 line-clamp-3 text-gray-600">{listing.description}</p>

      <button className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
        View Details
      </button>
    </div>
  );
}
