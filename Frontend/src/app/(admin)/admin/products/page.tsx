"use client";

import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminProductsManager } from "@/features/admin/components/AdminProductsManager";

export default function AdminProductsPage() {
  return <div className="flex min-h-screen flex-col bg-[#faf8f5] lg:flex-row"><AdminSidebar /><main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:ml-[235px] lg:px-8 lg:py-8"><AdminProductsManager /></main></div>;
}
