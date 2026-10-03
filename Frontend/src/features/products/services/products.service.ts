import { httpProductsService } from "@/features/products/services/products.http";
import type {
  Product,
  ProductId,
  ProductListQuery,
  ProductListResult,
} from "@/features/products/types/product.types";

export type ProductsService = {
  list(query: ProductListQuery): Promise<ProductListResult>;
  getById(id: ProductId): Promise<Product | null>;
};

export function createProductsService(): ProductsService {
  return httpProductsService;
}

export const productsService = createProductsService();