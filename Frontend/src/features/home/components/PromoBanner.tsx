"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, AnimatedButton } from "@/components/animations";

export function PromoBanner() {
  return (
    <FadeIn delay={0.2}>
      <section className="px-4 py-24 sm:px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col overflow-hidden rounded-lg bg-[#f4f0eb] lg:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[450px] flex-1 bg-[#2a2a2a] lg:h-auto overflow-hidden"
          >
            <Image
              src="/images/banner.png"
              alt="Le Jardin d'Or Solstice Collection"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"

              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </motion.div>

          <div className="flex flex-1 flex-col justify-center gap-6 p-8 sm:p-12 lg:p-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-[11px] font-bold uppercase text-[#c5a880]"
            >
              The Summer Solstice
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-tight text-[#1a1a1a] sm:text-[54px]"
            >
              Le Jardin d&apos;Or Solstice Collection
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-[14px] leading-relaxed text-[#605a54]"
            >
              Our highly anticipated limited reserve capturing the fleeting
              scent of summer dusk. Formulated with night-blooming cereus and
              sun-warmed clay.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <AnimatedButton
                type="button"
                className="inline-flex w-fit cursor-pointer items-center justify-center rounded bg-[#1a1a1a] px-8 py-4 text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#333333]"
              >
                Secure the Bottle
              </AnimatedButton>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </FadeIn>
  );
}
