import { apiGet } from "@/lib/api/client";
import { env } from "@/config/env";
import type { DashboardStats, AdminProduct } from "../types/admin.types";
import type {
  StrapiProject,
  StrapiResponse,
} from "@/features/products/types/strapi.types";
import { getStrapiMediaUrl } from "@/features/products/utils/strapi-mapper";

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await apiGet<StrapiResponse<StrapiProject[]>>(
    "/api/projects?populate=*&pagination[pageSize]=1000"
  );

  if (!res.data) throw new Error("Product data is unavailable.");
  const remainingPages = res.meta?.pagination?.pageCount ?? 1;
  const remainingResults = await Promise.all(
    Array.from({ length: Math.max(0, remainingPages - 1) }, (_, index) =>
      apiGet<StrapiResponse<StrapiProject[]>>(
        `/api/projects?populate=*&pagination[page]=${index + 2}&pagination[pageSize]=1000`
      )
    )
  );
  const products = [res.data, ...remainingResults.map((result) => result.data ?? [])].flat();

  const totalProducts = products.length;
  const hasPriceAndStock = products.every((product) => product.price != null && product.stock != null);
  const hasStock = products.every((product) => product.stock != null);

  const productsInStock = products.filter((p) => p.available !== false && (p.stock ?? 0) > 0).length;

  const outOfStock = products.filter((p) => p.available === false || (p.stock ?? 0) === 0).length;

  const totalRevenue = products.reduce((sum, p) => sum + Number(p.price) * Number(p.stock), 0);

  return {
    totalRevenue: hasPriceAndStock ? { value: totalRevenue, trend: 0, isPositive: true } : null,
    totalProducts: { value: totalProducts, trend: 0, isPositive: true },
    productsInStock: hasStock ? { value: productsInStock, trend: 0, isPositive: true } : null,
    outOfStock: hasStock ? { value: outOfStock, trend: 0, isPositive: outOfStock === 0 } : null,
  };
}


function mapStrapiProjectToAdminProduct(p: StrapiProject): AdminProduct {
  let imageUrl = "";
  if (Array.isArray(p.image) && p.image.length > 0) {
    imageUrl = getStrapiMediaUrl(p.image[0].url);
  } else if (p.image && !Array.isArray(p.image)) {
    imageUrl = getStrapiMediaUrl(p.image.url);
  }

  // Determine stock status
  const stock = p.stock == null ? null : Number(p.stock);
  let status: AdminProduct["status"];
  if (stock === null) {
    status = "Unknown";
  } else if (p.available === false || stock === 0) {
    status = "Out of Stock";
  } else if (stock <= 5) {
    status = "Low Stock";
  } else {
    status = "In Stock";
  }

  return {
    id: p.documentId || String(p.id),
    name: p.name,
    collection: p.subtitle || p.category?.name || "",
    price: p.price == null ? null : Number(p.price),
    stock,
    status,
    image: imageUrl,
  };
}

/**
 * Fetch admin products from Strapi 
 */
export async function getAdminProducts(
  page: number = 1,
  pageSize: number = 6
): Promise<{ items: AdminProduct[]; total: number; page: number; pageSize: number }> {
  const res = await apiGet<StrapiResponse<StrapiProject[]>>(
    `/api/projects?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

  const items = (res.data || []).map(mapStrapiProjectToAdminProduct);
  const total = res.meta?.pagination?.total ?? items.length;

  return {
    items,
    total,
    page: res.meta?.pagination?.page ?? page,
    pageSize: res.meta?.pagination?.pageSize ?? pageSize,
  };
}

/**
 * Fetch a single product by ID from Strapi API
 */
export async function getAdminProductById(
  id: string
): Promise<AdminProduct | null> {
  const res = await apiGet<StrapiResponse<StrapiProject>>(
    `/api/projects/${encodeURIComponent(id)}?populate=*`
  );

  if (res.data) return mapStrapiProjectToAdminProduct(res.data);
  return null;
}


function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (!authStorage) return null;

    const parsed = JSON.parse(authStorage) as {
      state?: { token?: string };
    };

    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

/**
 * Delete a product 
 */
export async function deleteProduct(id: string): Promise<void> {
  const baseUrl = env.apiBaseUrl || "http://localhost:1337";
  const token = getAuthToken();

  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${baseUrl}/api/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || `Failed to delete product: ${response.statusText}`
    );
  }
}
