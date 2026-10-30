import { apiGet } from "@/lib/api/client";
import type {
  Product,
  ProductId,
  ProductListQuery,
  ProductListResult,
} from "@/features/products/types/product.types";
import type { ProductsService } from "@/features/products/services/products.service";
import type {
  StrapiProject,
  StrapiResponse,
} from "@/features/products/types/strapi.types";
import {
  buildStrapiProjectsQuery,
  mapStrapiProjectToProduct,
} from "@/features/products/utils/strapi-mapper";


export const httpProductsService: ProductsService = {
  async list(query: ProductListQuery): Promise<ProductListResult> {
    const queryString = buildStrapiProjectsQuery(query);
    const res = await apiGet<StrapiResponse<StrapiProject[]>>(
      `/api/projects?${queryString}`,
    );

    const items = (res.data || []).map(mapStrapiProjectToProduct);
    const total = res.meta?.pagination?.total ?? items.length;
    const page = res.meta?.pagination?.page ?? query.page ?? 1;
    const pageSize = res.meta?.pagination?.pageSize ?? query.pageSize ?? 8;

    return {
      items,
      total,
      page,
      pageSize,
    };
  },

  async getById(id: ProductId): Promise<Product | null> {
    if (!id) return null;

    try {
      const res = await apiGet<StrapiResponse<StrapiProject>>(
        `/api/projects/${encodeURIComponent(id)}?populate=*`,
      );
      if (res?.data) {
        return mapStrapiProjectToProduct(res.data);
      }
    } catch {
    }

    
    try {
      const isNumeric = /^\d+$/.test(id);
      let filterParam = "";

      if (isNumeric) {
        filterParam = `filters[id][$eq]=${id}`;
      } else {
        const readableName = id.replace(/-/g, " ");
        filterParam = `filters[name][$containsi]=${encodeURIComponent(readableName)}`;
      }

      const res = await apiGet<StrapiResponse<StrapiProject[]>>(
        `/api/projects?${filterParam}&populate=*`,
      );

      if (res?.data && res.data.length > 0) {
        return mapStrapiProjectToProduct(res.data[0]);
      }
    } catch {
      
    }

    return null;
  },
};
