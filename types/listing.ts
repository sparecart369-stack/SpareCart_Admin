export interface Listing {
  id: string;
  seller_id: string;

  name: string;
  category: string;
  subcategory?: string;
  make: string;
  model: string;

  year: number;

  condition: string;

  price: number;

  quantity: number;

  location: string;

  description: string;

  fulfillment: string;

  pickup_address: string;

  status: string;

  is_admin_listing: boolean;

  seller_rating: number;

  created_at: string;

  updated_at: string;

  chassis_number: string;

  part_number: string;

  is_available: boolean;
}
