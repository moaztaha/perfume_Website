export { ProductsPage } from "@/features/products/components/ProductsPage";
export { ProductDetailsPage } from "@/features/products/components/ProductDetailsPage";
export { ProductDetails, ProductDetailsHeader, ProductScentAnatomy } from "@/features/products/components/ProductDetails";
export { ProductImages } from "@/features/products/components/ProductImages";
export { ProductOptions } from "@/features/products/components/ProductOptions";
export { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
export { ProductCompanions } from "@/features/products/components/ProductCompanions";
export { ProductCard } from "@/features/products/components/ProductCard";
export { ProductGrid } from "@/features/products/components/ProductGrid";
export { ProductFilters } from "@/features/products/components/ProductFilters";
export { ProductPagination } from "@/features/products/components/ProductPagination";
export { ProductSortControl } from "@/features/products/components/ProductSort";
export { productsService } from "@/features/products/services/products.service";
export { mapStrapiProjectToProduct, buildStrapiProjectsQuery, getStrapiMediaUrl } from "@/features/products/utils/strapi-mapper";
export type { ProductDetailsActionsContext } from "@/features/products/components/ProductDetailsPage";
export { productPaths } from "@/features/products/paths";
export type {
  Product,
  ProductId,
  ProductListQuery,
  ProductListResult,
  ProductSearchParams,
  ProductVolumeOption,
  ProductNotesPyramid,
  ProductSort,
} from "@/features/products/types/product.types";
