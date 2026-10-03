import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import { ProductSortControl } from "@/features/products/components/ProductSort";
import { productsService } from "@/features/products/services/products.service";
import type {
  ProductListResult,
  ProductSearchParams,
} from "@/features/products/types/product.types";
import { parseProductListQuery } from "@/features/products/utils/product.utils";

type ProductsPageProps = {
  searchParams: ProductSearchParams;
  initialResult?: ProductListResult;
};

export async function ProductsPage({
  searchParams,
  initialResult,
}: ProductsPageProps) {
  const query = parseProductListQuery(searchParams);

  const productsResult = initialResult
    ? await Promise.resolve(initialResult)
    : await productsService.list(query);

  const products = productsResult?.items ?? [];
  const total = productsResult?.total ?? 0;
  const page = productsResult?.page ?? 1;
  const pageSize = productsResult?.pageSize ?? 8;

  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
      <ProductSortControl availableCount={total} />
      <ProductGrid products={products} />
      {products.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center py-16 text-center">
          <p className="text-[16px] font-semibold text-[#1a1a1a]">
            No fragrances found
          </p>
          <p className="mt-2 text-[14px] text-[#605a54]">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
      <ProductPagination page={page} pageSize={pageSize} total={total} />
    </div>
  );
}

