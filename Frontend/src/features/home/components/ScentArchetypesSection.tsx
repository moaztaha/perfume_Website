"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ScentArchetype } from "@/features/home/data/home-sections.data";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";

type ScentArchetypesSectionProps = {
  archetypes: ScentArchetype[];
};

export function ScentArchetypesSection({
  archetypes,
}: ScentArchetypesSectionProps) {
  return (
    <section className="bg-[#f4f0eb] px-4 py-20 sm:px-6 lg:px-20">
      <FadeIn className="mb-12 text-center">
        <h2 className="mb-3 font-[family-name:var(--font-instrument-serif)] text-[40px] text-[#1a1a1a] sm:text-[48px]">
          Scent Archetypes
        </h2>
        <p className="text-[14px] text-[#605a54]">
          CURATE YOUR PRESENCE BY SCENT PROFILE
        </p>
      </FadeIn>

      <FadeInStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {archetypes.map((archetype) => (
          <FadeInStaggerItem key={archetype.id}>
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex h-[280px] items-end overflow-hidden rounded-lg p-6"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-20% to-[rgba(26,26,26,0.4)]" />
              {archetype.image ? (
                <Image
                  src={archetype.image}
                  alt={archetype.name}
                  fill
                  className="size-full object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              ) : (
                <div className="size-full bg-[#2a2a2a]" />
              )}
              <div className="relative z-20">
                <h3 className="font-[family-name:var(--font-instrument-serif)] text-[28px] text-white">
                  {archetype.name}
                </h3>
                <p className="text-[11px] uppercase text-[#c5a880]">
                  {archetype.notes}
                </p>
              </div>
            </motion.div>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </section>
  );
}
