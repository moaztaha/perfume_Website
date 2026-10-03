import type { Metadata } from "next";
import { categoriesService } from "@/features/categories";
import { CategoriesClient } from "./CategoriesClient";
import { Footer } from "@/features/home/components/Footer";
import { footerLinks } from "@/features/home/data/home-sections.data";

export const metadata: Metadata = {
  title: "Fragrance Categories | Odoratus",
  description:
    "Explore the olfactory families, precious concentrations, and considered rituals that shape the Odoratus collection.",
};

export default async function CategoriesPage() {
  const categories = await categoriesService.list();

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <CategoriesClient categories={categories} />
      <Footer links={footerLinks} />
    </div>
  );
}
