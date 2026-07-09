export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="h-16 animate-pulse rounded-2xl bg-white/60 dark:bg-white/10" />
      ))}
    </div>
  );
}
