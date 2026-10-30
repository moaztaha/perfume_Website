import { getStrapiMediaUrl } from "@/features/products/utils/strapi-mapper";
import type {
  StrapiCategory,
  StrapiMedia,
} from "@/features/products/types/strapi.types";
import type { Category } from "@/features/categories/types/category.types";

/**
 * Maps a Strapi category 
 */
export function mapStrapiCategory(c: StrapiCategory): Category {
  let rawImages: StrapiMedia[] = [];
  if (Array.isArray(c.image)) {
    rawImages = c.image;
  } else if (c.image) {
    rawImages = [c.image];
  }

  const imageUrl = rawImages.length > 0 ? getStrapiMediaUrl(rawImages[0].url) : "";
  const slug = c.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

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
