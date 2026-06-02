"use client";

import { motion } from "framer-motion";
import { featureItems } from "@/data/features";

const ease = [0.22, 1, 0.36, 1];

// Pattern: 3 cards, 2 cards (indented), 3 cards, 2 cards (indented), 3 cards
const rows = (() => {
  const slices = [
    { range: [0, 3],  indent: false },
    { range: [3, 5],  indent: true  },
    { range: [5, 8],  indent: false },
    { range: [8, 10], indent: true  },
    { range: [10, 13],indent: false },
  ];
  let idx = 0;
  return slices.map(({ range, indent }) => ({
    indent,
    items: featureItems.slice(...range).map((f) => ({ ...f, idx: idx++ })),
  }));
})();

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 overflow-hidden border-b border-[var(--moifone-border)]/60 bg-[var(--moifone-bg)] py-10 sm:py-14"
    >
      {/* Reddish background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[10%] h-80 w-80 rounded-full bg-[#f9c5d0] opacity-50 blur-[100px]" />
        <div className="absolute left-[55%] top-[5%]  h-64 w-64 rounded-full bg-[#e8c5f0] opacity-35 blur-[85px]" />
        <div className="absolute left-[28%] top-[42%] h-96 w-96 rounded-full bg-[#fce4ec] opacity-40 blur-[110px]" />
        <div className="absolute left-[68%] top-[52%] h-72 w-72 rounded-full bg-[#f5b8c8] opacity-30 blur-[90px]" />
        <div className="absolute left-[4%]  top-[68%] h-56 w-56 rounded-full bg-[#f0c0d8] opacity-35 blur-[75px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--moifone-primary)]">
            Platform
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--moifone-ink)] sm:text-3xl">
            Intelligent operations, grounded in your data
          </h2>
        </div>

        {/* Mobile/tablet: flat 2-col grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {featureItems.map((f, i) => {
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: i * 0.03, ease }}
                className="rounded-xl border border-[var(--moifone-border)] bg-white/80 p-4 shadow-sm backdrop-blur-sm"
              >
                <p className="mb-1.5 text-[10px] font-bold tracking-widest text-[var(--moifone-primary)]/50">
                  {i + 1}.
                </p>
                <h3 className="text-sm font-semibold leading-snug text-[var(--moifone-ink)]">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--moifone-muted)]">{f.description}</p>
                {f.signals && (
                  <span className="mt-2 inline-block rounded bg-[var(--moifone-rose-mist)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--moifone-primary)]/80">
                    Signals
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: staggered rows — 6-col grid, each card spans 2 cols */}
        <div className="hidden flex-col gap-3 lg:flex lg:gap-4">
          {rows.map((row, ri) => (
            <div key={ri} className="grid grid-cols-6 gap-4">
              {row.indent && <div />}

              {row.items.map((f) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.42, delay: f.idx * 0.04, ease }}
                  whileHover={{ y: -3, transition: { duration: 0.2, ease } }}
                  className="col-span-2 rounded-xl border border-[var(--moifone-border)] bg-white/80 p-4 shadow-sm backdrop-blur-sm"
                >
                  <p className="mb-1.5 text-[10px] font-bold tracking-widest text-[var(--moifone-primary)]/50">
                    {f.idx + 1}.
                  </p>
                  <h3 className="text-sm font-semibold leading-snug text-[var(--moifone-ink)]">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--moifone-muted)]">
                    {f.description}
                  </p>
                  {f.signals && (
                    <span className="mt-2 inline-block rounded bg-[var(--moifone-rose-mist)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--moifone-primary)]/80">
                      Signals
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>{/* end desktop stagger */}

      </div>
    </section>
  );
}
