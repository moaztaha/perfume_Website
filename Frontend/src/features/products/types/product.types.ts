export type ProductId = string;

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVolumeOption = {
  size: string;
  price: number;
};

export type ProductNotesPyramid = {
  top?: string;
  heart?: string;
  base?: string;
};

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  notes: string;
  price: number;
  images: string[];
  category: string;
  occasion: string;
  gender: string;
  options: ProductOption[];
  inStockStatus?: string;
  volumeOptions?: ProductVolumeOption[];
  notesPyramid?: ProductNotesPyramid;
};

export type ProductSort =
  | "featured"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "newest";

export type ProductListQuery = {
  search?: string;
  category?: string;
  occasion?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
};

export type ProductListResult = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductSearchParams = Record<
  string,
  string | string[] | undefined
>;
