interface BarChartProps {
  data: Array<{ label: string; value: number }>;
}

export function BarChart({ data }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-bold text-zinc-700 dark:text-zinc-200">{item.label}</span>
            <span className="text-zinc-500 dark:text-zinc-400">{item.value}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
