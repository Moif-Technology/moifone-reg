"use client";

import { whyItems } from "@/data/whyMoifone";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export function WhyMoifone() {
  return (
    <section className="border-b border-[var(--moifone-border)]/60 bg-gradient-to-b from-white/50 to-[var(--moifone-bg)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--moifone-primary)]">
                Why Moifone
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--moifone-ink)] sm:text-3xl">
                Intelligent management, quietly premium
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--moifone-muted)] sm:text-base">
                We designed Moifone to feel calm and capable—so leaders see
                data-driven clarity, floor teams keep momentum, and automation
                stays in the background until it matters.
              </p>
            </FadeIn>
            <FadeIn delay={0.12} className="mt-8 hidden rounded-2xl border border-[var(--moifone-border)] bg-white p-6 shadow-sm lg:block">
              <p className="text-sm font-medium text-[var(--moifone-ink)]">
                “One stack. One rhythm—from live signals to settlement.”
              </p>
              <p className="mt-3 text-xs text-[var(--moifone-muted)]">
                — Moifone product principles
              </p>
            </FadeIn>
          </div>
          <FadeInStagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <FadeInItem key={item.title}>
                  <div className="h-full rounded-2xl border border-[var(--moifone-border)] bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <Icon
                      className="h-5 w-5 text-[var(--moifone-primary)]"
                      strokeWidth={1.5}
                    />
                    <h3 className="mt-3 text-sm font-semibold text-[var(--moifone-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--moifone-muted)]">
                      {item.body}
                    </p>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
