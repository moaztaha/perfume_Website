import { env } from "@/config/env";
import type {
  Product,
  ProductListQuery,
  ProductOption,
  ProductVolumeOption,
  ProductNotesPyramid,
} from "@/features/products/types/product.types";
import type {
  StrapiMedia,
  StrapiProject,
} from "@/features/products/types/strapi.types";

/**
 * Resolves a Strapi media URL to an accessible absolute URL and ensures localhost is replaced by 127.0.0.1.
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return "";

  let absoluteUrl = url;
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//")
  ) {
    absoluteUrl = url;
  } else {
    const base = env.strapiUrl || "http://127.0.0.1:1337";
    absoluteUrl = `${base}${url.startsWith("/") ? url : `/${url}`}`;
  }

  // حل مشكلة Private IP في Next.js Image عن طريق تحويل localhost إلى 127.0.0.1
  return absoluteUrl.replace("localhost", "127.0.0.1");
}

/**
 * Maps a Strapi project entity to the frontend Product domain model.
 */
export function mapStrapiProjectToProduct(p: StrapiProject): Product {
  // Extract images
  let rawImages: StrapiMedia[] = [];
  if (Array.isArray(p.image)) {
    rawImages = p.image;
  } else if (p.image) {
    rawImages = [p.image];
  }

  const images = rawImages
    .map((img) => getStrapiMediaUrl(img.url))
    .filter(Boolean);

  // Derive volume options from `size` component if provided, or default based on base price
  const volumeOptions: ProductVolumeOption[] =
Array.isArray(p.size) && p.size.length > 0
  ? p.size.map((s) => ({
      size: String(s.size).toLowerCase().includes("ml")
        ? String(s.size)
        : `${s.size} ml`,
      price: Number(s.price),
    }))
  : [
      // ...
    ]

  const options: ProductOption[] = [
    {
      id: "volume",
      name: "Volume",
      values: volumeOptions.map((v) => v.size),
    },
  ];

  // Stock status
  let inStockStatus = "Available in Atelier";
  if (p.available === false || p.stock === 0) {
    inStockStatus = "Out of Stock";
  } else if (p.stock !== null && p.stock !== undefined && p.stock <= 5) {
    inStockStatus = `Low Stock (${p.stock} left)`;
  }

  // Notes
  const notes =
    p.subtitle?.trim() ||
    (p.scent ? `${p.scent} / Fragrance` : "Signature Extract");

  // Category
  const categoryName = p.category?.name?.trim() || "";

  // Notes pyramid
  const notesPyramid: ProductNotesPyramid = {
    top: "Sicilian Bergamot, Pink Pepper",
    heart: "Egyptian Jasmine Sambac, Papyrus",
    base: "West Indian Sandalwood, Cardamom, Amber",
  };
  if (p.subtitle && p.subtitle.includes("/")) {
    const parts = p.subtitle.split("/").map((s) => s.trim());
    if (parts[1]) {
      notesPyramid.heart = parts[1];
    }
  }

  return {
    id: p.documentId || String(p.id),
    name: p.name,
    description: p.description || "",
    notes,
    price: Number(p.price) || 0,
    images,
    category: categoryName,
    occasion: p.occasion?.trim() || "",
    gender: p.gender?.trim() || "",
    options,
    inStockStatus,
    volumeOptions,
    notesPyramid,
  };
}

/**
 * Builds the query string for the Strapi /api/projects endpoint according to ProductListQuery.
 * 
 * Maps UI filters to Strapi fields:
 * - Scent Family → category (relation field)
 * - Occasion → occasion (string field)
 * - Gender → gender (string field)
 * - Price Range → price (integer field)
 */
export function buildStrapiProjectsQuery(query: ProductListQuery): string {
  const params: string[] = ["populate=*"];

  // Search filter across name, description, and subtitle
  if (query.search && query.search.trim()) {
    const s = encodeURIComponent(query.search.trim());
    params.push(`filters[$or][0][name][$containsi]=${s}`);
    params.push(`filters[$or][1][description][$containsi]=${s}`);
    params.push(`filters[$or][2][subtitle][$containsi]=${s}`);
  }

  // Category filter (= Scent Family in UI): filters on Strapi category relation name
  // Multiple categories use $in operator within $and to work with other filters
  if (query.category) {
    const cats = query.category.split(",").map((c) => c.trim()).filter(Boolean);
    if (cats.length === 1) {
      const cleaned = encodeURIComponent(cats[0].replace(/-/g, " "));
      params.push(`filters[category][name][$containsi]=${cleaned}`);
    } else if (cats.length > 1) {
      // Use nested $or for multiple category options
      cats.forEach((cat, idx) => {
        const cleaned = encodeURIComponent(cat.replace(/-/g, " "));
        params.push(`filters[$and][0][$or][${idx}][category][name][$containsi]=${cleaned}`);
      });
    }
  }

  // Occasion filter: filters on Strapi occasion string field
  // Multiple occasions use $in operator within $and to work with other filters
  if (query.occasion) {
    const occs = query.occasion.split(",").map((o) => o.trim()).filter(Boolean);
    if (occs.length === 1) {
      const cleaned = encodeURIComponent(occs[0].replace(/-/g, " "));
      params.push(`filters[occasion][$containsi]=${cleaned}`);
    } else if (occs.length > 1) {
      // Use nested $or for multiple occasion options
      occs.forEach((oc, idx) => {
        const cleaned = encodeURIComponent(oc.replace(/-/g, " "));
        params.push(`filters[$and][1][$or][${idx}][occasion][$containsi]=${cleaned}`);
      });
    }
  }

  // Gender filter: filters on Strapi gender string field
  // Multiple genders use $in operator within $and to work with other filters
  if (query.gender) {
    const genders = query.gender.split(",").map((g) => g.trim()).filter(Boolean);
    if (genders.length === 1) {
      const cleaned = encodeURIComponent(genders[0].replace(/-/g, " "));
      params.push(`filters[gender][$containsi]=${cleaned}`);
    } else if (genders.length > 1) {
      // Use nested $or for multiple gender options
      genders.forEach((g, idx) => {
        const cleaned = encodeURIComponent(g.replace(/-/g, " "));
        params.push(`filters[$and][2][$or][${idx}][gender][$containsi]=${cleaned}`);
      });
    }
  }

  // Price range filters
  if (query.minPrice !== undefined && Number.isFinite(query.minPrice)) {
    params.push(`filters[price][$gte]=${query.minPrice}`);
  }
  if (query.maxPrice !== undefined && Number.isFinite(query.maxPrice)) {
    params.push(`filters[price][$lte]=${query.maxPrice}`);
  }

  // Sort mapping
  const sortMap: Record<string, string> = {
    featured: "createdAt:desc",
    newest: "createdAt:desc",
    "price-asc": "price:asc",
    "price-desc": "price:desc",
    "name-asc": "name:asc",
    "name-desc": "name:desc",
  };
  const strapiSort = query.sort ? sortMap[query.sort] || "createdAt:desc" : "createdAt:desc";
  params.push(`sort=${strapiSort}`);

  // Pagination
  const page = query.page && query.page > 0 ? query.page : 1;
  const pageSize = query.pageSize && query.pageSize > 0 ? query.pageSize : 8;
  params.push(`pagination[page]=${page}`);
  params.push(`pagination[pageSize]=${pageSize}`);

  return params.join("&");
}