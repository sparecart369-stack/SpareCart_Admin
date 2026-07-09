import type { ActivityItem, Customer, Order, Seller, SparePart } from "@/types/admin";

const partNames = [
  "Turbocharger Assembly",
  "ABS Control Module",
  "LED Headlamp Unit",
  "Front Brake Caliper",
  "Alternator",
  "Radiator Fan Motor",
  "Fuel Injector Rail",
  "Steering Rack",
  "Rear Shock Absorber",
  "Clutch Pressure Plate",
];

const brands = ["Maruti Suzuki", "Hyundai", "Honda", "Toyota", "Mahindra", "Tata", "Ford", "Volkswagen"];
const models = ["Swift", "i20", "City", "Innova", "Scorpio", "Nexon", "EcoSport", "Polo"];
const categories = ["Engine", "Electrical", "Body", "Brakes", "Suspension", "Transmission", "Cooling", "Interior"];
const sellerShops = [
  "Metro Auto Salvage",
  "Prime Parts Hub",
  "Revive Motors",
  "Gearbox Gallery",
  "AutoNest Spares",
  "Torque Traders",
  "Wheelhouse Depot",
  "Ignition Market",
];
const customerNames = [
  "Aarav Menon",
  "Diya Sharma",
  "Kabir Khan",
  "Meera Nair",
  "Rohan Iyer",
  "Anika Rao",
  "Vivaan Das",
  "Sara Thomas",
  "Ishaan Verma",
  "Nisha Kapoor",
];
const cities = ["Bengaluru", "Mumbai", "Pune", "Delhi", "Chennai", "Kochi", "Hyderabad", "Ahmedabad"];

export const spareParts: SparePart[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const brand = brands[index % brands.length];
  const category = categories[(index * 3) % categories.length];

  return {
    id: `PRT-${String(id).padStart(4, "0")}`,
    image: `https://images.unsplash.com/photo-${[
      "1486262715619-67b85e0b08d3",
      "1517524008697-84bbe3c3fd98",
      "1600661653561-629509216228",
      "1625047509168-a7026f36de04",
    ][index % 4]}?auto=format&fit=crop&w=160&q=80`,
    name: `${partNames[index % partNames.length]} ${id}`,
    brand,
    model: models[(index + 2) % models.length],
    category,
    price: 1800 + ((index * 731) % 68500),
    seller: sellerShops[index % sellerShops.length],
    status: index % 11 === 0 ? "Out of Stock" : index % 5 === 0 ? "Low Stock" : "In Stock",
    dateAdded: `2026-${String((index % 6) + 1).padStart(2, "0")}-${String((index % 27) + 1).padStart(2, "0")}`,
  };
});

export const customers: Customer[] = Array.from({ length: 50 }, (_, index) => {
  const name = customerNames[index % customerNames.length];
  const id = index + 1;

  return {
    id: `CUS-${String(id).padStart(4, "0")}`,
    avatar: `https://i.pravatar.cc/96?img=${(index % 60) + 1}`,
    name: `${name} ${index > 9 ? id : ""}`.trim(),
    email: `${name.toLowerCase().replaceAll(" ", ".")}${id}@example.com`,
    phone: `+91 ${90000 + index * 137} ${10000 + index * 173}`,
    address: `${12 + index}, ${cities[index % cities.length]} Service Road`,
    totalOrders: 1 + ((index * 7) % 38),
    totalPurchase: 2500 + ((index * 6421) % 180000),
    status: index % 13 === 0 ? "Suspended" : index % 4 === 0 ? "Pending" : "Active",
  };
});

export const sellers: Seller[] = Array.from({ length: 25 }, (_, index) => ({
  id: `SEL-${String(index + 1).padStart(4, "0")}`,
  shop: `${sellerShops[index % sellerShops.length]} ${index > 7 ? index + 1 : ""}`.trim(),
  owner: customerNames[(index * 2) % customerNames.length],
  products: 12 + ((index * 9) % 96),
  rating: Number((3.8 + ((index * 17) % 12) / 10).toFixed(1)),
  revenue: 65000 + ((index * 38491) % 950000),
  status: index % 9 === 0 ? "Suspended" : index % 5 === 0 ? "Pending" : "Active",
}));

export const orders: Order[] = Array.from({ length: 200 }, (_, index) => {
  const part = spareParts[index % spareParts.length];
  const customer = customers[index % customers.length];
  const seller = sellers[index % sellers.length];

  return {
    id: `ORD-${String(2400 + index).padStart(5, "0")}`,
    customer: customer.name,
    seller: seller.shop,
    product: part.name,
    amount: part.price + ((index * 311) % 4500),
    paymentStatus: index % 17 === 0 ? "Failed" : index % 9 === 0 ? "Refunded" : index % 4 === 0 ? "Pending" : "Paid",
    deliveryStatus: index % 15 === 0 ? "Cancelled" : index % 4 === 0 ? "In Transit" : index % 3 === 0 ? "Packed" : "Delivered",
    date: `2026-${String((index % 7) + 1).padStart(2, "0")}-${String((index % 27) + 1).padStart(2, "0")}`,
  };
});

export const activities: ActivityItem[] = [
  {
    id: "act-1",
    label: "High-value order confirmed",
    detail: "Toyota Innova turbocharger sold by Prime Parts Hub.",
    time: "4 min ago",
    tone: "emerald",
  },
  {
    id: "act-2",
    label: "Seller verification pending",
    detail: "AutoNest Spares uploaded GST and warehouse photos.",
    time: "19 min ago",
    tone: "amber",
  },
  {
    id: "act-3",
    label: "Stock risk detected",
    detail: "Low stock across Hyundai electrical parts.",
    time: "42 min ago",
    tone: "rose",
  },
  {
    id: "act-4",
    label: "Customer segment grew",
    detail: "Repeat buyers increased by 8.2% this week.",
    time: "1 hr ago",
    tone: "sky",
  },
];

export const revenueSeries = [42, 58, 49, 72, 64, 91, 86, 104, 98, 126, 118, 142];
export const orderSeries = [22, 28, 25, 38, 35, 44, 51, 48, 59, 64, 71, 76];
export const categoryShare = [
  { label: "Engine", value: 34 },
  { label: "Electrical", value: 24 },
  { label: "Body", value: 18 },
  { label: "Brakes", value: 14 },
  { label: "Suspension", value: 10 },
];
