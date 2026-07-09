import { categoryShare, orderSeries, orders, revenueSeries, spareParts } from "@/data/admin-data";
import { GlassCard } from "@/components/cards/glass-card";
import { StatCard } from "@/components/cards/stat-card";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { PageHeader } from "@/components/layout/page-header";
import { BoxIcon, ChartIcon, OrdersIcon, ProfitIcon } from "@/components/ui/icons";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function SalesAnalyticsPage() {
  const revenue = orders.reduce((total, order) => total + order.amount, 0);
  const dailySales = orders.slice(0, 14).reduce((total, order) => total + order.amount, 0);
  const weeklySales = orders.slice(0, 60).reduce((total, order) => total + order.amount, 0);
  const monthlySales = Math.round(revenue * 0.62);
  const bestSellers = spareParts.slice(0, 6);

  return (
    <div className="animate-float-in space-y-6">
      <PageHeader title="Sales Analytics" description="Understand sales velocity, category demand, best-selling products, and revenue quality." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Daily Sales" value={formatCurrency(dailySales)} change="+7.5% today" icon={<ChartIcon className="h-6 w-6" />} tone="emerald" />
        <StatCard label="Weekly Sales" value={formatCurrency(weeklySales)} change="+16.2% this week" icon={<OrdersIcon className="h-6 w-6" />} tone="sky" />
        <StatCard label="Monthly Sales" value={formatCurrency(monthlySales)} change="+21.8% this month" icon={<ProfitIcon className="h-6 w-6" />} tone="violet" />
        <StatCard label="Units Sold" value={formatNumber(orderSeries.reduce((a, b) => a + b, 0))} change="Across 8 categories" icon={<BoxIcon className="h-6 w-6" />} tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <GlassCard title="Revenue Charts" subtitle="Gross sales indexed by month">
          <LineChart data={revenueSeries} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
        </GlassCard>
        <GlassCard title="Top Categories" subtitle="Best performing spare-part groups">
          <BarChart data={categoryShare} />
        </GlassCard>
      </div>

      <GlassCard title="Best Selling Products" subtitle="Products with strongest buyer demand">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {bestSellers.map((part, index) => (
            <div key={part.id} className="rounded-2xl bg-white/70 p-4 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-950 text-sm font-black text-white dark:bg-white dark:text-zinc-950">
                  {index + 1}
                </span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-300">{formatCurrency(part.price)}</span>
              </div>
              <h3 className="mt-4 text-sm font-black text-zinc-950 dark:text-white">{part.name}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{part.brand} · {part.category}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
