import Link from "next/link";
import { activities, categoryShare, orders, revenueSeries } from "@/data/admin-data";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { GlassCard } from "@/components/cards/glass-card";
import { StatCard } from "@/components/cards/stat-card";
import { PageHeader } from "@/components/layout/page-header";
import { ArrowLeftIcon, BoxIcon, ChartIcon, GlobeIcon, OrdersIcon, ProfitIcon, StoreIcon, UsersIcon } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { fetchDashboardCounts } from "@/lib/supabase-queries";

export default async function AdminDashboardPage() {
  const counts = await fetchDashboardCounts();
  const revenue = orders.reduce((total, order) => total + order.amount, 0);
  const profit = Math.round(revenue * 0.18);
  const paidOrders = orders.filter((order) => order.paymentStatus === "Paid").length;

  return (
    <div className="animate-float-in space-y-6">
      <PageHeader
        title="Marketplace Overview"
        description="A founder-focused control room for revenue, orders, supply, demand, and operational activity across SpareKart."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatCurrency(revenue)} change="+18.4% from last month" icon={<ChartIcon className="h-6 w-6" />} tone="emerald" />
        <StatCard label="Profit" value={formatCurrency(profit)} change="+12.8% margin lift" icon={<ProfitIcon className="h-6 w-6" />} tone="violet" />
        <StatCard label="Orders" value={formatNumber(counts.ordersCount)} change={`${paidOrders} paid orders`} icon={<OrdersIcon className="h-6 w-6" />} tone="sky" />
        <StatCard label="Customers" value={formatNumber(counts.customersCount)} change={`${counts.buyersCount} buyers registered`} icon={<UsersIcon className="h-6 w-6" />} tone="amber" />
        <StatCard label="Sellers" value={formatNumber(counts.sellersCount)} change={`${counts.sellersCount} active sellers`} icon={<StoreIcon className="h-6 w-6" />} tone="rose" />
        <StatCard label="Products" value={formatNumber(counts.productsCount)} change={`${counts.inStockPct}% currently in stock`} icon={<BoxIcon className="h-6 w-6" />} tone="zinc" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <GlassCard title="Revenue Momentum" subtitle="Monthly gross marketplace value">
          <LineChart data={revenueSeries} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
        </GlassCard>
        <GlassCard title="Top Categories" subtitle="Share of sales by part category">
          <BarChart data={categoryShare} />
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard title="Recent Orders" subtitle="Latest marketplace transactions">
          <div className="space-y-3">
            {orders.slice(0, 6).map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 p-3 dark:bg-white/5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-zinc-950 dark:text-white">{order.product}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{order.id} · {order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-zinc-950 dark:text-white">{formatCurrency(order.amount)}</p>
                  <StatusBadge status={order.paymentStatus} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Recent Activity" subtitle="Operational signals that need founder attention">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/40" />
                <div>
                  <p className="text-sm font-bold text-zinc-950 dark:text-white">{activity.label}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{activity.detail}</p>
                  <p className="mt-1 text-xs font-semibold text-zinc-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
