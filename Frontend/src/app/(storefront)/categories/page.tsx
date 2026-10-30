import type { Metadata } from "next";
import { categoriesService, CategoriesPage } from "@/features/categories";

export const metadata: Metadata = {
  title: "Categories | Odoratus",
  description:
    "Explore our complete collection of slow-luxury scent families and olfactory categories.",
};

export default async function CategoriesRoute() {
  const categories = await categoriesService.list();

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <CategoriesPage categories={categories} />
    </div>
  );
}
