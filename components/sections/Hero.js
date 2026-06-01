"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--moifone-border)]/60">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#f5e8ec]/90 via-[#faf5f6] to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-[#ede4e8]/70 to-transparent blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--moifone-border)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--moifone-muted)] shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[var(--moifone-primary)]" />
              Intelligent ERP + POS — register &amp; onboard
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-6">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-[var(--moifone-ink)] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              Set up and run your business smarter—with one intelligent ERP + POS
              platform
            </h1>
          </FadeIn>

          <FadeIn delay={0.14} className="mt-5">
            <p className="max-w-xl text-pretty text-base leading-relaxed text-[var(--moifone-muted)] sm:text-lg">
              Moifone blends registration, configuration, and daily operations with
              subtle automation and intelligent signals—so you move faster, see
              clearer, and keep ERP and POS in lockstep from day one.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/signup?plan=standard" className="w-full sm:w-auto">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="#pricing"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              View Pricing
            </Button>
          </FadeIn>

          <FadeIn delay={0.26} className="mt-10 flex flex-wrap gap-6 text-xs text-[var(--moifone-muted)]">
            <div>
              <p className="font-semibold text-[var(--moifone-ink)]">
                Guided, intelligent setup
              </p>
              <p className="mt-1">From profile to go-live—with sensible defaults</p>
            </div>
            <div className="hidden h-8 w-px bg-[var(--moifone-border)] sm:block" />
            <div>
              <p className="font-semibold text-[var(--moifone-ink)]">
                Automated insight layer
              </p>
              <p className="mt-1">Signals for inventory, sales &amp; staff (Pro+)</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.12} y={28} className="relative lg:justify-self-end">
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#7b1e3a]/12 via-transparent to-[#7b1e3a]/5 blur-2xl"
            />
            <div className="relative rounded-2xl border border-[var(--moifone-border)] bg-white p-5 shadow-[0_24px_60px_-24px_rgba(123,30,58,0.18)]">
              <div className="flex items-center justify-between border-b border-[var(--moifone-border)] pb-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--moifone-muted)]">
                    Setup preview
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--moifone-ink)]">
                    Moifone Console
                  </p>
                </div>
                <span className="rounded-full bg-[var(--moifone-rose-mist)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--moifone-primary)]">
                  In progress
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Company profile", pct: 100 },
                  { label: "POS terminals", pct: 72 },
                  { label: "Inventory catalog", pct: 45 },
                  { label: "Staff & roles", pct: 28 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--moifone-ink)]">{row.label}</span>
                      <span className="text-[var(--moifone-muted)]">{row.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--moifone-border)]">
                      <motion.div
                        initial={false}
                        animate={{ width: `${row.pct}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.4 + row.pct * 0.004,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-[#7b1e3a] to-[#a02848]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--moifone-border)] bg-[var(--moifone-bg)]/80 p-3">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--moifone-muted)]">
                    Today&apos;s sales
                  </p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-[var(--moifone-ink)]">
                    $12,480
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--moifone-border)] bg-[var(--moifone-bg)]/80 p-3">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--moifone-muted)]">
                    Active branches
                  </p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-[var(--moifone-ink)]">
                    3
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="absolute -bottom-6 -left-4 hidden w-[52%] rounded-xl border border-[var(--moifone-border)] bg-white/95 p-3 shadow-lg backdrop-blur sm:block"
            >
              <p className="text-[10px] font-medium text-[var(--moifone-muted)]">
                Recent activity
              </p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-[var(--moifone-ink)]">
                <li>Invoice #2041 posted</li>
                <li>Reorder suggestion: 3 SKUs</li>
              </ul>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="absolute -right-2 top-8 hidden rounded-lg border border-[var(--moifone-border)] bg-white/90 px-3 py-2 text-[10px] font-medium text-[var(--moifone-primary)] shadow-md sm:block"
            >
              Live signals on
            </motion.div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
