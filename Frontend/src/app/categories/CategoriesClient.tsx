"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Category } from "@/features/categories";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.75 11.25L11.25 4.75" />
      <path d="M5.75 4.75h5.5v5.5" />
    </svg>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const filterParam = category.name.toLowerCase();

  return (
    <Link
      href={`/shop?category=${encodeURIComponent(filterParam)}`}
      className="group flex flex-col gap-[18px] cursor-pointer"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative h-[350px] overflow-hidden rounded-lg"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-20% to-[rgba(26,26,26,0.4)]" />
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute right-5 top-5 z-20 flex size-10 items-center justify-center rounded-full bg-white/91 text-[#1a1a1a]"
        >
          <ArrowUpRightIcon />
        </motion.div>
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="size-full bg-[#e5e5e5]" />
        )}
      </motion.div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-[family-name:var(--font-instrument-serif)] text-[28px] leading-[1.3] text-[#1a1a1a]">
          {category.name}
        </h3>
        <p className="text-[11px] font-semibold uppercase text-[#c5a880]">
          {category.description}
        </p>
      </div>
    </Link>
  );
}

type CategoriesClientProps = {
  categories: Category[];
};

export function CategoriesClient({ categories }: CategoriesClientProps) {
  return (
    <>
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[#ebe6de] px-4 py-6 sm:px-6 lg:px-20"
      >
        <ol className="flex items-center gap-2 text-[12px]">
          <li>
            <Link href="/" className="text-[#605a54] transition-colors hover:text-[#1a1a1a] cursor-pointer">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#605a54]">
            ›
          </li>
          <li className="font-semibold text-[#1a1a1a]" aria-current="page">
            Categories
          </li>
        </ol>
      </nav>

      {/* Page introduction */}
      <FadeIn className="px-4 pb-14 pt-16 sm:px-6 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-3 font-[family-name:var(--font-instrument-serif)] text-[48px] leading-[1.3] text-[#1a1a1a] sm:text-[64px]"
        >
          Fragrance Categories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[620px] text-[14px] leading-relaxed text-[#605a54]"
        >
          Explore the olfactory families, precious concentrations, and considered 
          rituals that shape the Odoratus collection.
        </motion.p>
      </FadeIn>

      {/* Category grid */}
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
    </>
  );
}
