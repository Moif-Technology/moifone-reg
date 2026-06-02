"use client";

import { motion } from "framer-motion";
import { businessTypes } from "@/data/businessTypes";
import { FadeIn } from "@/components/ui/FadeIn";

export function BusinessTypes() {
  return (
    <section className="border-b border-[var(--moifone-border)] bg-[var(--moifone-bg)] py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl bg-[var(--moifone-ink)] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            {/* Top label + heading + description */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4738a]">
              Solutions
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Built for how you operate
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
              Moifone adapts to diverse business models—whether you serve tables,
              move retail SKUs, or run a service counter—with setup paths that
              later support intelligent, type-aware configuration.
            </p>

            {/* Items row */}
            <div className="mt-8 grid grid-cols-4 gap-y-6 sm:mt-10 sm:flex sm:divide-x sm:divide-white/[0.08]">
              {businessTypes.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-24px" }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    whileHover="hovered"
                    className="flex cursor-default flex-col gap-3 sm:min-w-[100px] sm:flex-1 sm:gap-4 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                  >
                    <motion.span
                      variants={{
                        hovered: { y: -3, scale: 1.15, color: "#ffffff" },
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "#d4738a", display: "inline-flex" }}
                    >
                      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.5} />
                    </motion.span>
                    <span className="text-[11px] font-bold uppercase leading-snug tracking-wide text-white">
                      {b.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
