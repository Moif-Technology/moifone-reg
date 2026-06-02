"use client";

import { motion } from "framer-motion";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ArrowRight, MessageCircle } from "lucide-react";

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#fdf5f7] via-white to-[#fdf8f9] py-20 sm:py-28">

      {/* Soft bg blob */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-[#f9c5d0] opacity-20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-8%] right-[-6%] h-[300px] w-[300px] rounded-full bg-[#fad4e0] opacity-15 blur-[80px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">

          {/* Left: heading block */}
          <motion.div
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8c5cf] bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#7b1e3a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7b1e3a]" />
              FAQ
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#1a1020] sm:text-4xl">
              Answers before<br />
              <span className="text-[#7b1e3a]">you register</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Straightforward answers on operations, intelligence tiers, and how
              Moifone supports data-informed decisions—so you can move forward
              with confidence.
            </p>

            {/* Contact CTA */}
            <div className="mt-8 rounded-2xl border border-[#f0d5dc] bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fceef2]">
                <MessageCircle className="h-5 w-5 text-[#7b1e3a]" />
              </div>
              <p className="mt-3 text-sm font-semibold text-[#1a1020]">Still have questions?</p>
              <p className="mt-1 text-xs text-gray-400">Our team is happy to walk you through setup.</p>
              <a
                href="mailto:hello@moiftech.com"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#7b1e3a] hover:underline"
              >
                Contact us <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FAQAccordion />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
