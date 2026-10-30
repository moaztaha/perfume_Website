"use client";

import { FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import type { Category } from "@/features/categories/types/category.types";
import { CategoryCard } from "@/features/categories/components/CategoryCard";

type CategoryGridProps = {
  categories: Category[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-20 text-center">
        <p className="text-[18px] font-semibold text-[#1a1a1a]">
          No categories found
        </p>
        <p className="mt-2 text-[14px] text-[#605a54]">
          Categories from Strapi could not be found or have not been created yet.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 sm:px-6 lg:px-20">
      <FadeInStagger
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        staggerDelay={0.1}
      >
        {categories.map((category) => (
          <FadeInStaggerItem key={category.id}>
            <CategoryCard category={category} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </div>
  );
}
