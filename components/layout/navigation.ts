import {
  BoxIcon,
  ChartIcon,
  DashboardIcon,
  OrdersIcon,
  ProfitIcon,
  SettingsIcon,
  StoreIcon,
  UsersIcon,
} from "@/components/ui/icons";

export const navigation = [
  { label: "Dashboard", href: "/", icon: DashboardIcon },
  { label: "Spare Parts", href: "/spare-parts", icon: BoxIcon },
  { label: "Customers", href: "/customers", icon: UsersIcon },
  { label: "Sellers", href: "/sellers", icon: StoreIcon },
  { label: "Orders", href: "/orders", icon: OrdersIcon },
  { label: "Sales Analytics", href: "/sales-analytics", icon: ChartIcon },
  { label: "Profit", href: "/profit", icon: ProfitIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
] as const;
