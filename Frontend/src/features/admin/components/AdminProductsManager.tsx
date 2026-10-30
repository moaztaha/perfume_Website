"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductTable } from "./ProductTable";
import { AddProductModal } from "./AddProductModal";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { getAdminProducts, deleteProduct } from "../services/admin-stats.service";
import { createProduct, updateProduct } from "../services/admin-products.service";
import type { AdminProduct, ProductFormData } from "../types/admin.types";

const PAGE_SIZE = 6;

export function AdminProductsManager() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAdminProducts(currentPage, PAGE_SIZE);
      setProducts(result.items);
      setTotalProducts(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => { void loadProducts(); }, [loadProducts]);

  const saveProduct = async (data: FormData | ProductFormData, imageFile: File | null, mode: "create" | "edit") => {
    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await createProduct(data, imageFile);
        setIsAddModalOpen(false);
        setCurrentPage(1);
        toast.success("Product added successfully");
      } else if (editingProduct) {
        await updateProduct(editingProduct.id, data, imageFile);
        setEditingProduct(null);
        toast.success("Product updated successfully");
      }
      await loadProducts();
    } catch (err) {
      toast.error(mode === "create" ? "Failed to add product" : "Failed to update product", {
        description: err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      if (products.length === 1 && currentPage > 1) setCurrentPage((page) => page - 1);
      else await loadProducts();
      toast.success("Product deleted", { description: `“${deleteTarget.name}” has been removed from the catalog.` });
      setDeleteTarget(null);
    } catch (err) {
      toast.error("Failed to delete product", { description: err instanceof Error ? err.message : "An unexpected error occurred." });
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#b8956a]">Catalog</p>
          <h1 className="mt-0.5 font-[family-name:var(--font-instrument-serif)] text-[36px] leading-tight text-[#1a1a1a] sm:text-[42px]">Products</h1>
        </div>
        <button type="button" onClick={() => setIsAddModalOpen(true)} className="flex h-11 shrink-0 items-center gap-2 rounded bg-[#b8956a] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#a07d54] sm:px-5 sm:text-[13px]">
          <span aria-hidden="true">+</span> Add New Product
        </button>
      </div>

      {error ? (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6 text-[13px] text-red-700" role="alert">
          <p>{error}</p><button type="button" onClick={() => void loadProducts()} className="mt-3 font-semibold underline">Retry</button>
        </div>
      ) : loading ? (
        <div className="mt-8 h-96 animate-pulse rounded-lg bg-white" aria-label="Loading products" />
      ) : products.length === 0 ? (
        <div className="mt-8 rounded-lg border border-[#ebe6de] bg-white p-12 text-center text-[14px] text-[#8a837a]">No products found. Add your first product to the catalog.</div>
      ) : (
        <div className="mt-8">
          <ProductTable products={products} onDelete={(id) => setDeleteTarget(products.find((p) => p.id === id) ?? null)} onEdit={(id) => setEditingProduct(products.find((p) => p.id === id) ?? null)} currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(totalPages, page)))} />
        </div>
      )}

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={(data, file) => saveProduct(data, file ?? null, "create")} isLoading={isSubmitting} />
      {editingProduct && <AddProductModal isOpen onClose={() => setEditingProduct(null)} onSubmit={(data, file) => saveProduct(data, file ?? null, "edit")} isLoading={isSubmitting} initialData={{ name: editingProduct.name, subtitle: editingProduct.collection, price: editingProduct.price ?? 0, stock: editingProduct.stock ?? 0, occasion: "", available: (editingProduct.stock ?? 0) > 0, description: "" }} mode="edit" />}
      <DeleteConfirmDialog isOpen={Boolean(deleteTarget)} title="Delete Product?" message={`Are you sure you want to delete “${deleteTarget?.name ?? "this product"}”? This action cannot be undone.`} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} isLoading={isDeleting} />
    </>
  );
}
