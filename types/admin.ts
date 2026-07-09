export type Status = "Active" | "Pending" | "Suspended" | "Delivered" | "Processing" | "Cancelled" | "In Stock" | "Low Stock" | "Out of Stock";

export type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

export type DeliveryStatus = "Delivered" | "In Transit" | "Packed" | "Cancelled";

export interface SparePart {
  id: string;
  image: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  seller: string;
  status: Extract<Status, "In Stock" | "Low Stock" | "Out of Stock">;
  dateAdded: string;
}

export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalPurchase: number;
  status: Extract<Status, "Active" | "Pending" | "Suspended">;
}

export interface Seller {
  id: string;
  shop: string;
  owner: string;
  products: number;
  rating: number;
  revenue: number;
  status: Extract<Status, "Active" | "Pending" | "Suspended">;
}

export interface Order {
  id: string;
  customer: string;
  seller: string;
  product: string;
  amount: number;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  date: string;
}

export interface ActivityItem {
  id: string;
  label: string;
  detail: string;
  time: string;
  tone: "emerald" | "sky" | "amber" | "rose" | "violet";
}
