"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { ProductForm } from "@/features/admin/components/ProductForm";
import { useRequireAuth } from "@/features/auth/hooks/useRequireAuth";
import { getAdminProductById } from "@/features/admin/services/admin-stats.service";
import { updateProduct } from "@/features/admin/services/admin-products.service";
import type { ProductFormData } from "@/features/admin/types/admin.types";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<
    Partial<ProductFormData> | undefined
  >(undefined);

  useEffect(() => {
    if (isAuthenticated) {
      loadProduct();
    }
  }, [isAuthenticated, params.id]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const product = await getAdminProductById(params.id);
      if (product) {
        setInitialData({
          name: product.name,
          collection: product.collection,
          description: `Description for ${product.name}`,
          price: product.price ?? undefined,
          stock: product.stock ?? undefined,
          category: "eau-de-parfum",
          occasion: "evening",
          gender: "unisex",
          notes: "Sample notes",
          images: [product.image],
        });
      }
    } catch (error) {
      console.error("Failed to load product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await updateProduct(params.id, data);
      router.push("/admin");
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin");
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <div className="text-[14px] text-[#8a837a]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!initialData) {
    return (
      <div className="flex min-h-screen flex-col bg-[#faf8f5] lg:flex-row">
        <AdminSidebar />
        <main className="min-w-0 flex-1 lg:ml-[235px]">
          <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <AdminHeader title="Product Not Found" />
            <p className="mt-4 text-[14px] text-[#605a54]">
              The product you're looking for doesn't exist.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] lg:flex-row">
      <AdminSidebar />

      <main className="min-w-0 flex-1 lg:ml-[235px]">
        <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <AdminHeader
            title="Edit Product"
            description="Update fragrance details in the Maison Noir collection."
          />

          <div className="mt-8">
            <ProductForm
              initialData={initialData}
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
