interface LineChartProps {
  data: number[];
  labels?: string[];
  height?: number;
}

export function LineChart({ data, labels = [], height = 260 }: LineChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 640;
  const padding = 28;
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = padding + ((max - value) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 to-zinc-800 p-4 text-white dark:from-white/10 dark:to-white/5">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="55%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 5 }, (_, index) => (
          <line
            key={index}
            x1={padding}
            x2={width - padding}
            y1={padding + index * ((height - padding * 2) / 4)}
            y2={padding + index * ((height - padding * 2) / 4)}
            stroke="rgba(255,255,255,0.10)"
          />
        ))}
        <polygon points={`${padding},${height - padding} ${points.join(" ")} ${width - padding},${height - padding}`} fill="url(#areaGradient)" />
        <polyline points={points.join(" ")} fill="none" stroke="url(#lineGradient)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point, index) => {
          const [x, y] = point.split(",");
          return <circle key={index} cx={x} cy={y} r="5" fill="#fff" stroke="#34d399" strokeWidth="3" />;
        })}
      </svg>
      {labels.length > 0 && (
        <div className="grid grid-cols-6 gap-2 px-2 text-xs font-semibold text-white/55 sm:grid-cols-12">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}
