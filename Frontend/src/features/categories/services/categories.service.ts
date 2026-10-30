import { apiGet } from "@/lib/api/client";
import type {
  StrapiCategory,
  StrapiResponse,
} from "@/features/products/types/strapi.types";
import type { Category } from "@/features/categories/types/category.types";
import { mapStrapiCategory } from "@/features/categories/utils/category.mapper";

export type CategoriesService = {
  list(): Promise<Category[]>;
  getByDocumentId(documentId: string): Promise<Category | null>;
};

export const categoriesService: CategoriesService = {
  async list(): Promise<Category[]> {
    try {
      const res = await apiGet<StrapiResponse<StrapiCategory[]>>(
        "/api/categories?populate=*&sort=name:asc",
      );

      if (!res?.data || !Array.isArray(res.data)) {
        return [];
      }

      return res.data.map(mapStrapiCategory);
    } catch (err) {
      console.error("Failed to fetch categories from Strapi:", err);
      return [];
    }
  },

  async getByDocumentId(documentId: string): Promise<Category | null> {
    if (!documentId) return null;

    try {
      const res = await apiGet<StrapiResponse<StrapiCategory>>(
        `/api/categories/${encodeURIComponent(documentId)}?populate=*`,
      );
      if (res?.data) {
        return mapStrapiCategory(res.data);
      }
    } catch {
    }

    try {
      const readableName = documentId.replace(/-/g, " ");
      const res = await apiGet<StrapiResponse<StrapiCategory[]>>(
        `/api/categories?filters[name][$containsi]=${encodeURIComponent(readableName)}&populate=*`,
      );
      if (res?.data && res.data.length > 0) {
        return mapStrapiCategory(res.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch category by ID from Strapi:", err);
    }

    return null;
  },
};
