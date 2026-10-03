import type {
  ProductListQuery,
  ProductSearchParams,
  ProductSort,
} from "@/features/products/types/product.types";

const SORT_VALUES: ProductSort[] = [
  "featured",
  "name-asc",
  "name-desc",
  "price-asc",
  "price-desc",
  "newest",
];

function firstValue(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function allValues(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (value) {
    return [value];
  }
  return [];
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatWholePrice(amount: number): string {
  return `$${amount}`;
}

export function parseProductListQuery(
  searchParams: ProductSearchParams,
): ProductListQuery {
  const search = firstValue(searchParams.search)?.trim();
  const categories = allValues(searchParams.category);
  const occasions = allValues(searchParams.occasion);
  const genders = allValues(searchParams.gender);
  const minPrice = Number(firstValue(searchParams.minPrice));
  const maxPrice = Number(firstValue(searchParams.maxPrice));
  const sortValue = firstValue(searchParams.sort);
  const pageValue = Number(firstValue(searchParams.page));
  const pageSizeValue = Number(firstValue(searchParams.pageSize));

  return {
    search: search || undefined,
    category: categories.length > 0 ? categories.join(",") : undefined,
    occasion: occasions.length > 0 ? occasions.join(",") : undefined,
    gender: genders.length > 0 ? genders.join(",") : undefined,
    minPrice: Number.isFinite(minPrice) && minPrice >= 0 ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    sort: SORT_VALUES.includes(sortValue as ProductSort)
      ? (sortValue as ProductSort)
      : "featured",
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
    pageSize:
      Number.isFinite(pageSizeValue) && pageSizeValue > 0
        ? pageSizeValue
        : 8,
  };
}

export function buildProductQueryString(query: ProductListQuery): string {
  const params = new URLSearchParams();
  
  if (query.search) params.set("search", query.search);
  if (query.category) {
    query.category.split(",").forEach((cat) => params.append("category", cat));
  }
  if (query.occasion) {
    query.occasion.split(",").forEach((occ) => params.append("occasion", occ));
  }
  if (query.gender) {
    query.gender.split(",").forEach((g) => params.append("gender", g));
  }
  if (query.minPrice !== undefined) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice !== undefined) params.set("maxPrice", String(query.maxPrice));
  if (query.sort && query.sort !== "featured") params.set("sort", query.sort);
  if (query.page && query.page > 1) params.set("page", String(query.page));
  if (query.pageSize && query.pageSize !== 8) params.set("pageSize", String(query.pageSize));
  
  return params.toString();
}
