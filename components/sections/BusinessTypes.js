"use client";

import { businessTypes } from "@/data/businessTypes";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export function BusinessTypes() {
  return (
    <section className="border-b border-[var(--moifone-border)]/60 bg-white/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--moifone-primary)]">
            Solutions
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--moifone-ink)] sm:text-3xl">
            Built for how you operate
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--moifone-muted)] sm:text-base">
            Moifone adapts to diverse business models—whether you serve tables,
            move retail SKUs, or run a service counter—with setup paths that
            later support intelligent, type-aware configuration.
          </p>
        </FadeIn>

        <FadeInStagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {businessTypes.map((b) => {
            const Icon = b.icon;
            return (
              <FadeInItem key={b.id}>
                <div className="group flex items-center gap-3 rounded-2xl border border-[var(--moifone-border)] bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8dce0] hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--moifone-rose-mist)] text-[var(--moifone-primary)] transition-colors group-hover:bg-[#f0e0e5]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-medium text-[var(--moifone-ink)]">
                    {b.label}
                  </span>
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
