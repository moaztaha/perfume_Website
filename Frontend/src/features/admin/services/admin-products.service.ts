import { env } from "@/config/env";
import type { ProductFormData } from "../types/admin.types";

type StrapiError = {
  error: {
    status: number;
    name: string;
    message: string;
  };
};


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

function buildProductFormData(
  data: ProductFormData | FormData,
  imageFile?: File | null
): FormData {
  const formData = new FormData();
  let payloadData: Record<string, unknown>;
  let attachedFile: File | null = imageFile && imageFile.size > 0 ? imageFile : null;

  if (data instanceof FormData) {
    const rawData = data.get("data");
    if (typeof rawData !== "string") {
      throw new Error("Product form data is missing.");
    }

    try {
      payloadData = JSON.parse(rawData) as Record<string, unknown>;
    } catch {
      throw new Error("Product form data is invalid.");
    }

    const formFile = data.get("files.image") ?? data.get("files") ?? data.get("image");
    if (!attachedFile && typeof File !== "undefined" && formFile instanceof File && formFile.size > 0) {
      attachedFile = formFile;
    }
  } else {
    payloadData = {
      name: data.name,
      subtitle: data.subtitle || data.collection || "",
      price: Number(data.price),
      stock: Number(data.stock),
      occasion: data.occasion || "",
      available: data.available !== undefined ? Boolean(data.available) : Number(data.stock) > 0,
      description: data.description || "",
    };

    if (data.categoryId || data.category) {
      payloadData.category = data.categoryId || data.category;
    }
  }

  if (payloadData.price !== undefined) {
    payloadData.price = Math.round(Number(payloadData.price)) || 0;
  }
  if (payloadData.stock !== undefined) {
    payloadData.stock = Math.round(Number(payloadData.stock)) || 0;
  }

  // Strapi's Content API expects fields in `data` and media files in
  // `files.<field>` on the same multipart request.
  formData.append("data", JSON.stringify(payloadData));
  if (attachedFile && attachedFile.size > 0) {
    formData.append("files.image", attachedFile, attachedFile.name);
  }

  return formData;
}

function getMutationHeaders(token: string | null): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  // Do not set Content-Type; fetch supplies the multipart boundary.
  return headers;
}


export async function createProduct(
  data: ProductFormData | FormData,
  imageFile?: File | null
): Promise<{ id: string; documentId: string }> {
  try {
    const baseUrl = env.apiBaseUrl || "http://localhost:1337";
    const token = getAuthToken();
    const body = buildProductFormData(data, imageFile);

    const response = await fetch(`${baseUrl}/api/projects`, {
      method: "POST",
      headers: getMutationHeaders(token),
      body,
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as StrapiError;
      throw new Error(
        errorData.error?.message || `Failed to create product: ${response.statusText}`
      );
    }

    const result = await response.json();
    return {
      id: result.data.id.toString(),
      documentId: result.data.documentId,
    };
  } catch (error) {
    console.error("Create product error:", error);
    throw error;
  }
}

/**
 * Update an existing product in Strapi.
 */
export async function updateProduct(
  id: string,
  data: ProductFormData | FormData,
  imageFile?: File | null
): Promise<void> {
  try {
    const baseUrl = env.apiBaseUrl || "http://localhost:1337";
    const token = getAuthToken();
    const body = buildProductFormData(data, imageFile);

    const response = await fetch(`${baseUrl}/api/projects/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: getMutationHeaders(token),
      body,
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as StrapiError;
      throw new Error(
        errorData.error?.message || `Failed to update product: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Update product error:", error);
    throw error;
  }
}

/**
 * Delete a product from Strapi
 */
export async function deleteProductById(id: string): Promise<void> {
  try {
    const baseUrl = env.apiBaseUrl || "http://localhost:1337";
    const token = getAuthToken();

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}/api/projects/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as StrapiError;
      throw new Error(
        errorData.error?.message || `Failed to delete product: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Delete product error:", error);
    throw error;
  }
}
