"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/lib/toast";
import { FadeIn, AnimatedButton } from "@/components/animations";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email required", {
        description: "Please enter your email address",
      });
      return;
    }

    // TODO: Implement newsletter signup
    console.log("Newsletter signup:", email);

    toast.promise(
      // Simulate API call
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Subscribing...",
        success: () => {
          setEmail("");
          return "Successfully subscribed to Atelier Chronicles";
        },
        error: "Failed to subscribe. Please try again.",
      },
    );
  };

  return (
    <FadeIn delay={0.2}>
      <section className="px-4 py-24 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-[600px] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-4 font-[family-name:var(--font-instrument-serif)] text-[40px] text-[#1a1a1a]"
          >
            Atelier Chronicles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 text-[14px] leading-relaxed text-[#605a54]"
          >
            Subscribe to receive exclusive access to Private Reserves, launch
            invitations, and seasonal olfactory compositions.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 rounded border border-[#ebe6de] bg-white px-5 py-4 text-[13px] text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
            />
            <AnimatedButton
              type="submit"
              className="rounded bg-[#1a1a1a] px-8 py-4 text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#333333] cursor-pointer"
            >
              Join
            </AnimatedButton>
          </motion.form>
        </div>
      </section>
    </FadeIn>
  );
}
