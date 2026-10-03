export type StrapiMediaFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes?: number;
  url: string;
};

export type StrapiMedia = {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  url: string;
};

export type StrapiCategory = {
  id: number;
  documentId: string;
  name: string;
  subtitle?: string | null;
  image?: StrapiMedia[] | StrapiMedia | null;
  products?: StrapiProject[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
};

export type StrapiProductSize = {
  id: number;
  size: string;
  price: number;
};

export type StrapiProject = {
  id: number;
  documentId: string;
  name: string;
  price: number;
  description?: string | null;
  subtitle?: string | null;
  scent?: string | null;
  occasion?: string | null;
  gender?: string | null;
  stock?: number | null;
  available?: boolean | null;
  image?: StrapiMedia[] | StrapiMedia | null;
  category?: StrapiCategory | null;
  size?: StrapiProductSize[] | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
};

export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiResponse<T> = {
  data: T;
  meta?: {
    pagination?: StrapiPagination;
  };
};
