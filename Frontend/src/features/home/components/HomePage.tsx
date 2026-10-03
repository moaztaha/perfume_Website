"use client";

import type { Product } from "@/features/products/types/product.types";
import type { Category } from "@/features/categories/types/category.types";
import {
  HeroSection,
  TrendingSection,
  ScentArchetypesSection,
  OccasionsSection,
  PromoBanner,
  NewsletterSection,
  Footer,
} from "@/features/home/components";
import {
  trendingProducts,
  scentArchetypes,
  occasions,
  footerLinks,
} from "@/features/home/data/home-sections.data";

type HomePageProps = {
  initialProducts?: Product[];
  initialCategories?: Category[];
};

export function HomePage({
  initialProducts,
  initialCategories,
}: HomePageProps = {}) {
  const productsToDisplay =
    initialProducts && initialProducts.length > 0
      ? initialProducts.slice(0, 4).map((p) => ({
          id: p.id,
          name: p.name,
          notes: p.notes,
          price: p.price,
          image: p.images?.[0] || "",
        }))
      : trendingProducts;

  const archetypesToDisplay =
    initialCategories && initialCategories.length > 0
      ? initialCategories.slice(0, 4).map((c) => ({
          id: c.name.toLowerCase(),
          name: c.name,
          notes: c.description || c.subtitle || "",
          image: c.image || "",
        }))
      : scentArchetypes;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <HeroSection />
      <TrendingSection products={productsToDisplay} />
      <ScentArchetypesSection archetypes={scentArchetypes} />
      <OccasionsSection occasions={occasions} />
      <PromoBanner />
      <NewsletterSection />
      <Footer links={footerLinks} />
    </div>
  );
}
