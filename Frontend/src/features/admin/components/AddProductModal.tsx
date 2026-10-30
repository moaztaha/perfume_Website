"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import type { ProductFormData } from "../types/admin.types";
import { apiGet } from "@/lib/api/client";

type CategoryOption = {
  id: number;
  documentId?: string;
  name: string;
};

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: FormData | ProductFormData,
    imageFile?: File | null
  ) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<ProductFormData>;
  mode?: "add" | "edit";
};

export function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialData,
  mode = "add",
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    subtitle: initialData?.subtitle || initialData?.collection || "",
    categoryId:
      initialData?.categoryId !== undefined
        ? String(initialData.categoryId)
        : initialData?.category !== undefined
          ? String(initialData.category)
          : "",
    price: initialData?.price !== undefined ? initialData.price : 0,
    stock: initialData?.stock !== undefined ? initialData.stock : 0,
    occasion: initialData?.occasion || "",
    available:
      initialData?.available !== undefined ? initialData.available : true,
    description: initialData?.description || "",
  });

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        subtitle: initialData.subtitle || initialData.collection || "",
        categoryId:
          initialData.categoryId !== undefined
            ? String(initialData.categoryId)
            : initialData.category !== undefined
              ? String(initialData.category)
              : "",
        price: initialData.price !== undefined ? initialData.price : 0,
        stock: initialData.stock !== undefined ? initialData.stock : 0,
        occasion: initialData.occasion || "",
        available:
          initialData.available !== undefined ? initialData.available : true,
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function fetchCategories() {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);
        const res = await apiGet<{ data: CategoryOption[] }>(
          "/api/categories?sort=name:asc"
        );
        if (isMounted) {
          setCategories(res?.data || []);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
        if (isMounted) {
          setCategoriesError("Failed to load categories. Please try again.");
        }
      } finally {
        if (isMounted) {
          setCategoriesLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const submissionData = new FormData();

      const payloadData: Record<string, unknown> = {
        name: formData.name.trim(),
        subtitle: formData.subtitle.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        occasion: formData.occasion.trim(),
        available: Boolean(formData.available),
        description: formData.description.trim(),
      };

      if (formData.categoryId) {
        payloadData.category = formData.categoryId;
      }

      submissionData.append("data", JSON.stringify(payloadData));

      if (imageFile) {
        submissionData.append("files.image", imageFile);
      }

      await onSubmit(submissionData, imageFile);
    } catch (err) {
      console.error("Form submission error:", err);
      toast.error("Failed to save fragrance", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    }
  };

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#ebe6de] bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-start justify-between border-b border-[#ebe6de] bg-white p-6">
          <div>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[28px] leading-tight text-[#1a1a1a]">
              {mode === "edit" ? "Edit Fragrance" : "New Fragrance"}
            </h2>
            <p className="mt-1 text-[13px] text-[#8a837a]">
              {mode === "edit"
                ? "Update the fragrance details in the catalog."
                : "Introduce a new sensory masterpiece to the catalog."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-[#f4f0eb] disabled:opacity-50"
            disabled={isLoading}
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#8a837a]"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* 1. Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]"
              >
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                disabled={isLoading}
                className="mt-2 block w-full rounded border border-[#ebe6de] bg-[#faf8f5] px-4 py-2.5 text-[14px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g. Imperial Patchouli"
              />
            </div>

            {/* 2. Subtitle (olfactory notes) */}
            <div>
              <label
                htmlFor="subtitle"
                className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]"
              >
                Subtitle (Olfactory Notes)
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                disabled={isLoading}
                className="mt-2 block w-full rounded border border-[#ebe6de] bg-[#faf8f5] px-4 py-2.5 text-[14px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g. Rare Turkish rose, saffron & smoked birch"
              />
            </div>

            {/* 3. Category */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="category"
                  className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]"
                >
                  Category
                </label>
                {categoriesLoading && (
                  <span className="text-[11px] text-[#8a837a]">
                    Loading categories...
                  </span>
                )}
              </div>
              <select
                id="category"
                name="category"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }))
                }
                disabled={isLoading || categoriesLoading}
                className="mt-2 block w-full rounded border border-[#ebe6de] bg-[#faf8f5] px-4 py-2.5 text-[14px] text-[#1a1a1a] transition-colors focus:border-[#1a1a1a] focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option
                    key={cat.documentId || cat.id}
                    value={cat.documentId || cat.id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              {categoriesError && (
                <p className="mt-1 text-[12px] text-red-600">
                  {categoriesError}
                </p>
              )}
            </div>

            {/* 4. Price & Stock Quantity */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]"
                >
                  Price (USD) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price === 0 ? "" : formData.price}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      price: val === "" ? 0 : parseFloat(val),
                    }));
                  }}
                  required
                  disabled={isLoading}
                  className="mt-2 block w-full rounded border border-[#ebe6de] bg-[#faf8f5] px-4 py-2.5 text-[14px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="0.00"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label
                  htmlFor="stock"
                  className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]"
                >
                  Stock Quantity *
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.stock === 0 ? "" : formData.stock}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      stock: val === "" ? 0 : parseInt(val, 10),
                    }));
                  }}
                  required
                  disabled={isLoading}
                  className="mt-2 block w-full rounded border border-[#ebe6de] bg-[#faf8f5] px-4 py-2.5 text-[14px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="0"
                />
              </div>
            </div>

            {/* 5. Occasion & Availability */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Occasion */}
              <div>
                <label
                  htmlFor="occasion"
                  className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]"
                >
                  Occasion
                </label>
                <input
                  id="occasion"
                  name="occasion"
                  type="text"
                  value={formData.occasion}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      occasion: e.target.value,
                    }))
                  }
                  disabled={isLoading}
                  className="mt-2 block w-full rounded border border-[#ebe6de] bg-[#faf8f5] px-4 py-2.5 text-[14px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g. Evening, Autumn Gala"
                />
              </div>

              {/* Availability (Boolean Toggle Switch) */}
              <div>
                <label
                  id="available-label"
                  className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]"
                >
                  Availability
                </label>
                <div className="mt-2 flex h-[42px] items-center justify-between rounded border border-[#ebe6de] bg-[#faf8f5] px-4">
                  <span className="text-[13px] text-[#1a1a1a]">
                    {formData.available ? "Available" : "Unavailable"}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-labelledby="available-label"
                    aria-checked={formData.available}
                    disabled={isLoading}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        available: !prev.available,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                      formData.available ? "bg-[#1a1a1a]" : "bg-[#d4cec3]"
                    }`}
                  >
                    <span className="sr-only">Toggle product availability</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.available ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Sensory Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]"
              >
                Sensory Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
                disabled={isLoading}
                rows={3}
                className="mt-2 block w-full rounded border border-[#ebe6de] bg-[#faf8f5] px-4 py-2.5 text-[14px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the top, heart, and base olfactory notes..."
              />
            </div>

            {/* 7. Product Image */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a837a]">
                Product Image
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`mt-2 flex flex-col items-center justify-center rounded border-2 border-dashed py-8 transition-colors ${
                  dragActive
                    ? "border-[#b8956a] bg-[#faf8f5]"
                    : "border-[#d4cec3] bg-[#faf8f5]"
                } ${imagePreview ? "pb-4 pt-4" : ""}`}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-auto rounded object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      disabled={isLoading}
                      className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                      aria-label="Remove image"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 3L9 9M9 3L3 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#b8956a]"
                    >
                      <path
                        d="M35 25V31.6667C35 32.5507 34.6488 33.3986 34.0237 34.0237C33.3986 34.6488 32.5507 35 31.6667 35H8.33333C7.44928 35 6.60143 34.6488 5.97631 34.0237C5.35119 33.3986 5 32.5507 5 31.6667V25M28.3333 13.3333L20 5M20 5L11.6667 13.3333M20 5V25"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-3 text-[14px] text-[#1a1a1a]">
                      Drag perfume portrait or{" "}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="font-medium text-[#b8956a] hover:underline cursor-pointer disabled:opacity-50"
                      >
                        browse
                      </button>
                    </p>
                    <p className="mt-1 text-[11px] text-[#8a837a]">
                      High resolution transparent PNG preferred
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  disabled={isLoading}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 rounded border border-[#ebe6de] bg-white px-6 py-2.5 text-[13px] font-medium text-[#605a54] transition-colors hover:bg-[#faf8f5] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded bg-[#b8956a] px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#a07d54] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>{mode === "edit" ? "Saving..." : "Adding Product..."}</span>
                </>
              ) : (
                <span>{mode === "edit" ? "Save Changes" : "Add Product"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
