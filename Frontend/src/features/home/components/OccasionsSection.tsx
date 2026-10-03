"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Occasion } from "@/features/home/data/home-sections.data";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";

type OccasionsSectionProps = {
  occasions: Occasion[];
};

export function OccasionsSection({ occasions }: OccasionsSectionProps) {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-20">
      <FadeIn className="mb-12 text-center">
        <h2 className="mb-3 font-[family-name:var(--font-instrument-serif)] text-[40px] text-[#1a1a1a] sm:text-[48px]">
          Occasional Scent Curation
        </h2>

        <p className="text-[14px] text-[#605a54]">
          INTENTIONALLY FORMULATED FOR SIGNIFICANT MOMENTS
        </p>
      </FadeIn>

      <FadeInStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {occasions.map((occasion) => (
          <FadeInStaggerItem key={occasion.id}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative h-60 overflow-hidden rounded-lg bg-[#f4f0eb]"
              >
                <Image
                  src={occasion.image}
                  alt={occasion.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </motion.div>

              <div>
                <h3 className="font-[family-name:var(--font-instrument-serif)] text-[24px] text-[#1a1a1a]">
                  {occasion.name}
                </h3>

                <p className="text-[13px] text-[#605a54]">
                  {occasion.description}
                </p>
              </div>
            </motion.div>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </section>
  );
}
