import { apiGet } from "@/lib/api/client";
import { env } from "@/config/env";
import { getStrapiMediaUrl } from "@/features/products/utils/strapi-mapper";
import type {
  StrapiCategory,
  StrapiMedia,
  StrapiResponse,
} from "@/features/products/types/strapi.types";
import type { Category } from "@/features/categories/types/category.types";

const fallbackCategories: Category[] = [
  {
    id: "floral",
    documentId: "floral",
    name: "Floral",
    subtitle: "Rose, jasmine & neroli",
    description: "Rose, jasmine & neroli",
    image: "/images/categories/floral.jpg",
  },
  {
    id: "woody",
    documentId: "woody",
    name: "Woody",
    subtitle: "Cedarwood, oud & santal",
    description: "Cedarwood, oud & santal",
    image: "/images/categories/woody.jpg",
  },
  {
    id: "oriental",
    documentId: "oriental",
    name: "Oriental",
    subtitle: "Amber, spices & vanilla",
    description: "Amber, spices & vanilla",
    image: "/images/categories/oriental.jpg",
  },
  {
    id: "fresh",
    documentId: "fresh",
    name: "Fresh",
    subtitle: "Citrus, marine & herbs",
    description: "Citrus, marine & herbs",
    image: "/images/categories/fresh.jpg",
  },
  {
    id: "private-reserve",
    documentId: "private-reserve",
    name: "Private Reserve",
    subtitle: "Rare materials, singular batches",
    description: "Rare materials, singular batches",
    image: "/images/categories/private-reserve.jpg",
  },
  {
    id: "atelier-oils",
    documentId: "atelier-oils",
    name: "Atelier Oils",
    subtitle: "Concentrated botanical rituals",
    description: "Concentrated botanical rituals",
    image: "/images/categories/atelier-oils.jpg",
  },
  {
    id: "discovery-sets",
    documentId: "discovery-sets",
    name: "Discovery Sets",
    subtitle: "A passage through the house",
    description: "A passage through the house",
    image: "/images/categories/discovery-sets.jpg",
  },
  {
    id: "gifts",
    documentId: "gifts",
    name: "Gifts & Occasions",
    subtitle: "Considered gestures, beautifully wrapped",
    description: "Considered gestures, beautifully wrapped",
    image: "/images/categories/gifts.jpg",
  },
];

function mapStrapiCategory(c: StrapiCategory): Category {
  let rawImages: StrapiMedia[] = [];
  if (Array.isArray(c.image)) {
    rawImages = c.image;
  } else if (c.image) {
    rawImages = [c.image];
  }

  const imageUrl = rawImages.length > 0 ? getStrapiMediaUrl(rawImages[0].url) : "";
  const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const products = (c.products || []).map((p) => ({
    id: p.documentId || String(p.id),
    name: p.name,
    price: Number(p.price) || 0,
    subtitle: p.subtitle || undefined,
  }));

  return {
    id: slug || c.documentId,
    documentId: c.documentId,
    name: c.name,
    subtitle: c.subtitle || undefined,
    description: c.subtitle || "",
    image: imageUrl,
    products,
  };
}

export type CategoriesService = {
  list(): Promise<Category[]>;
  getByDocumentId(documentId: string): Promise<Category | null>;
};

export const categoriesService: CategoriesService = {
  async list() {
    if (env.useMockApi) {
      return fallbackCategories;
    }

    try {
      const res = await apiGet<StrapiResponse<StrapiCategory[]>>(
        "/api/categories?populate=*&sort=name:asc",
      );

      if (!res?.data || res.data.length === 0) {
        return fallbackCategories;
      }

      return res.data.map(mapStrapiCategory);
    } catch (err) {
      console.error("Failed to fetch categories from Strapi:", err);
      return fallbackCategories;
    }
  },

  async getByDocumentId(documentId) {
    if (env.useMockApi) {
      return (
        fallbackCategories.find(
          (c) => c.documentId === documentId || c.id === documentId,
        ) ?? null
      );
    }

    try {
      const res = await apiGet<StrapiResponse<StrapiCategory>>(
        `/api/categories/${documentId}?populate=*`,
      );
      if (res?.data) {
        return mapStrapiCategory(res.data);
      }
    } catch {
      // Try search by name/slug if documentId not found
    }

    return null;
  },
};
