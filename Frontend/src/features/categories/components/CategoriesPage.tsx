import type { Category } from "@/features/categories/types/category.types";
import { CategoryBreadcrumbs } from "@/features/categories/components/CategoryBreadcrumbs";
import { CategoryGrid } from "@/features/categories/components/CategoryGrid";

type CategoriesPageProps = {
  categories: Category[];
};

export function CategoriesPage({ categories }: CategoriesPageProps) {
  return (
    <>
      <CategoryBreadcrumbs />
      <CategoryGrid categories={categories} />
    </>
  );
}

export const CategoriesClient = CategoriesPage;
