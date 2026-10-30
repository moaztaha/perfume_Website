"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { DashboardStats } from "@/features/admin/components/DashboardStats";
import { getDashboardStats, getAdminProducts } from "@/features/admin/services/admin-stats.service";
import type { DashboardStats as DashboardStatsType, AdminProduct } from "@/features/admin/types/admin.types";
import { useRequireAuth } from "@/features/auth/hooks/useRequireAuth";

export default function AdminDashboardPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useRequireAuth();
  const [stats, setStats] = useState<DashboardStatsType | null>(null);
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    getDashboardStats()
      .then((data) => { if (active) setStats(data); })
      .catch((err: unknown) => { if (active) setStatsError(err instanceof Error ? err.message : "Unable to load statistics."); })
      .finally(() => { if (active) setStatsLoading(false); });
    getAdminProducts(1, 6)
      .then((data) => { if (active) setProducts(data.items); })
      .catch((err: unknown) => { if (active) setProductsError(err instanceof Error ? err.message : "Unable to load recent products."); })
      .finally(() => { if (active) setProductsLoading(false); });
    return () => { active = false; };
  }, [isAuthenticated]);

  if (authLoading || !isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] lg:flex-row">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:ml-[235px] lg:px-8 lg:py-8">
        <div className="mb-6">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#b8956a]">Admin dashboard</p>
          <h1 className="mt-0.5 break-words font-[family-name:var(--font-instrument-serif)] text-[34px] leading-tight text-[#1a1a1a] sm:text-[42px]">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
        </div>
        {statsError ? <p className="mt-8 text-[13px] text-red-700" role="alert">Statistics unavailable: {statsError}</p> : <div className="mt-8"><DashboardStats stats={stats} isLoading={statsLoading} /></div>}
        {productsError ? <p className="mt-8 text-[13px] text-red-700" role="alert">Recent products unavailable: {productsError}</p> : null}
        {!productsLoading && !productsError && products && products.length > 0 && (
          <section className="mt-8 rounded-lg border border-[#ebe6de] bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ebe6de] p-4 sm:p-6">
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-tight text-[#1a1a1a]">Latest Products</h2>
              <Link href="/admin/products" className="text-[13px] font-medium text-[#b8956a] hover:underline">View all products</Link>
            </div>
            <ul className="divide-y divide-[#ebe6de]">
              {products.slice(0, 6).map((product) => <li key={product.id} className="flex flex-col items-start justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded bg-[#f4f0eb]">
                    {product.image ? <Image src={product.image} alt={product.name} fill sizes="48px" className="object-cover" /> : <div className="flex size-full items-center justify-center text-[8px] uppercase tracking-wider text-[#8a837a]">No Image</div>}
                  </div>
                  <div className="min-w-0"><p className="truncate font-[family-name:var(--font-instrument-serif)] text-[17px] text-[#1a1a1a]">{product.name}</p>{product.collection && <p className="mt-0.5 truncate text-[12px] text-[#8a837a]">{product.collection}</p>}</div>
                </div>
                <div className="flex max-w-full flex-wrap items-center gap-3 text-[13px] sm:shrink-0 sm:gap-5"><span className="font-medium text-[#1a1a1a]">{product.price === null ? "—" : `$${product.price.toFixed(2)}`}</span><span className={product.status === "Out of Stock" ? "text-red-700" : product.status === "Low Stock" ? "text-yellow-700" : product.status === "Unknown" ? "text-[#8a837a]" : "text-green-700"}>{product.stock === null ? "Stock unavailable" : `${product.stock} in stock`}</span></div>
              </li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
