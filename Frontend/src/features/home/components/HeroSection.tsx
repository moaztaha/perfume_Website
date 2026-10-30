"use client";

import Link from "next/link";
import { motion } from "framer-motion";
const MotionLink = motion.create(Link);
import { productPaths } from "@/features/products/paths";
import { AnimatedButton } from "@/components/animations";

export function HeroSection() {
  return (
    <section className="relative flex h-[680px] items-end bg-[#1a1a1a] px-4 pb-20 sm:px-6 lg:px-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(26,26,26,0.3)]" />
        <div
          className="size-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex max-w-[580px] flex-col gap-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-[family-name:var(--font-instrument-serif)] text-[64px] leading-none text-white sm:text-[80px]"
        >
          Narrative In A Glass
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[16px] leading-relaxed text-white/90"
        >
          Ethereal extractions designed to evoke memory, stillness, and elegant
          presence. Crafted with deliberate restraint in our Parisian studio.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <MotionLink
            href={productPaths.list}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex w-fit items-center justify-center rounded bg-[#c5a880] px-10 py-[18px] text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#b39770] cursor-pointer"
          >
            Explore The Collections
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  );
}