"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Category } from "@/features/categories/types/category.types";
import { categoryPaths } from "@/features/categories/paths";

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

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={categoryPaths.filter(category.name)}
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
        {category.description && (
          <p className="text-[11px] font-semibold uppercase text-[#c5a880]">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
