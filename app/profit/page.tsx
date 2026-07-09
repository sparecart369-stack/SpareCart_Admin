import { orders } from "@/data/admin-data";
import { GlassCard } from "@/components/cards/glass-card";
import { StatCard } from "@/components/cards/stat-card";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { PageHeader } from "@/components/layout/page-header";
import { ChartIcon, OrdersIcon, ProfitIcon, SettingsIcon } from "@/components/ui/icons";
import { formatCurrency } from "@/lib/utils";

export default function ProfitPage() {
  const grossRevenue = orders.reduce((total, order) => total + order.amount, 0);
  const commission = Math.round(grossRevenue * 0.12);
  const expenses = 284000;
  const netProfit = commission - expenses;

  return (
    <div className="animate-float-in space-y-6">
      <PageHeader title="Profit" description="Track marketplace commission, operating expenses, net profit, and growth movement." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Gross Revenue" value={formatCurrency(grossRevenue)} change="+18.4% GMV" icon={<ChartIcon className="h-6 w-6" />} tone="emerald" />
        <StatCard label="Net Profit" value={formatCurrency(netProfit)} change="+11.6% after expenses" icon={<ProfitIcon className="h-6 w-6" />} tone="violet" />
        <StatCard label="Commission" value={formatCurrency(commission)} change="12% marketplace fee" icon={<OrdersIcon className="h-6 w-6" />} tone="sky" />
        <StatCard label="Expenses" value={formatCurrency(expenses)} change="-4.2% controlled spend" icon={<SettingsIcon className="h-6 w-6" />} tone="amber" />
        <StatCard label="Profit Growth" value="24.8%" change="+3.1 pts QoQ" icon={<ProfitIcon className="h-6 w-6" />} tone="rose" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <GlassCard title="Profit Growth" subtitle="Monthly net profit index">
          <LineChart data={[18, 22, 28, 25, 34, 39, 46, 51, 49, 58, 66, 74]} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
        </GlassCard>
        <GlassCard title="Revenue Allocation" subtitle="Where each rupee is moving">
          <BarChart
            data={[
              { label: "Seller Payouts", value: 72 },
              { label: "Commission", value: 12 },
              { label: "Operations", value: 9 },
              { label: "Payment Costs", value: 4 },
              { label: "Support", value: 3 },
            ]}
          />
        </GlassCard>
      </div>
    </div>
  );
}
