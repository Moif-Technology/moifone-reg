"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-[var(--moifone-border)] bg-gradient-to-br from-white via-[#fdf8f9] to-[#f8f0f2] px-6 py-12 shadow-[0_24px_60px_-30px_rgba(123,30,58,0.15)] sm:px-12 sm:py-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#7b1e3a]/8 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--moifone-ink)] sm:text-3xl">
              Start your smart business journey with Moifone
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--moifone-muted)] sm:text-base">
              Register, define how you operate, and step into intelligent ERP + POS
              workflows—automated reporting, forecasting signals, and calmer
              control as you scale.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button href="/signup?plan=standard" className="w-full sm:w-auto">
                Start smart registration
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="#pricing"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
