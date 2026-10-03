import type { Metadata } from "next";
import { HomePage } from "@/features/home";
import { productsService } from "@/features/products/services/products.service";
import { categoriesService } from "@/features/categories/services/categories.service";

export const metadata: Metadata = {
  title: "Odoratus | Slow-Luxury Liquid Narratives",
  description:
    "An independent olfactory house cultivating slow-luxury liquid narratives. Hand-poured in small batches using sustainably sourced botanicals.",
};

export default async function HomeRoute() {
  const [productsResult, categories] = await Promise.all([
    productsService.list({ pageSize: 4, sort: "featured" }),
    categoriesService.list(),
  ]);

  return (
    <HomePage
      initialProducts={productsResult.items}
      initialCategories={categories}
    />
  );
}
