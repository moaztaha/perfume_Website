import type { DashboardStats as DashboardStatsType } from "../types/admin.types";

function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-[#ebe6de] bg-white p-4 shadow-sm sm:p-6">
      <div className="h-3 w-24 rounded bg-[#ebe6de]" />
      <div className="mt-4 h-8 w-32 rounded bg-[#ebe6de]" />
    </div>
  );
}


type StatCardProps = {
  label: string;
  value: string;
  trend: number;
  isPositive: boolean;
};

function StatCard({ label, value, trend, isPositive }: StatCardProps) {
  const trendColor = isPositive ? "text-green-600" : "text-red-600";
  const trendIcon = isPositive ? "↑" : "↓";

  return (
    <div className="rounded-lg border border-[#ebe6de] bg-white p-4 shadow-sm sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
        <p className="break-words font-[family-name:var(--font-instrument-serif)] text-[28px] leading-none text-[#1a1a1a] sm:text-[32px]">
          {value}
        </p>
        {trend !== 0 && (
          <div className={`flex items-center gap-1 text-[13px] font-medium ${trendColor}`}>
            <span>{trendIcon}</span>
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

type DashboardStatsProps = {
  stats: DashboardStatsType | null;
  isLoading?: boolean;
};

export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      label: "Inventory Value",
      value: stats.totalRevenue ? `$${stats.totalRevenue.value.toLocaleString()}` : null,
      trend: stats.totalRevenue?.trend ?? 0,
      isPositive: stats.totalRevenue?.isPositive ?? true,
    },
    {
      label: "Total Products",
      value: stats.totalProducts ? stats.totalProducts.value.toLocaleString() : null,
      trend: stats.totalProducts?.trend ?? 0,
      isPositive: stats.totalProducts?.isPositive ?? true,
    },
    {
      label: "Products in Stock",
      value: stats.productsInStock ? stats.productsInStock.value.toLocaleString() : null,
      trend: stats.productsInStock?.trend ?? 0,
      isPositive: stats.productsInStock?.isPositive ?? true,
    },
    {
      label: "Out of Stock",
      value: stats.outOfStock ? stats.outOfStock.value.toLocaleString() : null,
      trend: stats.outOfStock?.trend ?? 0,
      isPositive: stats.outOfStock?.isPositive ?? true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
      {statCards.filter((stat): stat is typeof stat & { value: string } => stat.value !== null).map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          trend={stat.trend}
          isPositive={stat.isPositive}
        />
      ))}
    </div>
  );
}
