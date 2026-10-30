"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { ProductForm } from "@/features/admin/components/ProductForm";
import { useRequireAuth } from "@/features/auth/hooks/useRequireAuth";
import type { ProductFormData } from "@/features/admin/types/admin.types";

import { createProduct } from "@/features/admin/services/admin-products.service";

export default function NewProductPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await createProduct(data);
      router.push("/admin");
    } catch (error) {
      console.error("Failed to create product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin");
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <div className="text-[14px] text-[#8a837a]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] lg:flex-row">
      <AdminSidebar />

      <main className="min-w-0 flex-1 lg:ml-[235px]">
        <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <AdminHeader
            title="Add New Product"
            description="Create a new fragrance in the Maison Noir collection."
          />

          <div className="mt-8">
            <ProductForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
