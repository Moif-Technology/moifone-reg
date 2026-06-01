"use client";

import { motion } from "framer-motion";
import { featureGroups } from "@/data/features";
import { FadeIn } from "@/components/ui/FadeIn";

const ease = [0.22, 1, 0.36, 1];

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-24 border-b border-[var(--moifone-border)]/60 bg-white/40 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center sm:mx-0 sm:max-w-none sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--moifone-primary)]">
            Platform
          </p>
          <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-[var(--moifone-ink)] sm:text-3xl">
            Intelligent operations, grounded in your data
          </h2>
          <p className="mt-2.5 text-sm leading-snug text-[var(--moifone-muted)] sm:max-w-xl sm:text-[0.9375rem]">
            ERP and POS in one place—subtle automation and signals so teams stay
            fast without noisy dashboards.
          </p>
        </FadeIn>

        <div className="mt-10 space-y-8 sm:mt-11 sm:space-y-9">
          {featureGroups.map((group, gi) => {
            const offset = featureGroups
              .slice(0, gi)
              .reduce((n, g) => n + g.items.length, 0);

            return (
              <div key={group.id}>
                <FadeIn delay={gi * 0.04}>
                  <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--moifone-muted)]/75 sm:text-left">
                    {group.label}
                  </p>
                </FadeIn>
                <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-4">
                  {group.items.map((f, i) => {
                    const Icon = f.icon;
                    const staggerIndex = offset + i;
                    return (
                      <motion.div
                        key={f.title}
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-32px" }}
                        transition={{
                          duration: 0.42,
                          delay: staggerIndex * 0.035,
                          ease,
                        }}
                        whileHover={{
                          y: -2,
                          transition: { duration: 0.25, ease },
                        }}
                        className={`flex flex-col rounded-xl border bg-white/90 p-4 shadow-[0_1px_12px_-2px_rgba(26,20,24,0.06)] transition-shadow duration-300 hover:shadow-[0_6px_24px_-6px_rgba(26,20,24,0.08)] sm:p-4 ${
                          f.signals
                            ? "border-[#ebe0e4]/90 ring-1 ring-[#7b1e3a]/[0.05]"
                            : "border-[var(--moifone-border)]/90"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--moifone-primary)]/[0.07] text-[var(--moifone-primary)]">
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                          {f.signals && (
                            <span className="rounded bg-[var(--moifone-rose-mist)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--moifone-primary)]/85">
                              Signals
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3 text-sm font-semibold leading-snug text-[var(--moifone-ink)]">
                          {f.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-snug text-[var(--moifone-muted)]">
                          {f.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
