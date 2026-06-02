"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { whyItems } from "@/data/whyMoifone";
import { FadeIn } from "@/components/ui/FadeIn";

const ease = [0.22, 1, 0.36, 1];

const stats = [
  { numeric: 120,  suffix: "+",   decimal: 0, label: "Business types supported" },
  { numeric: 2.5,  suffix: "M+",  decimal: 1, label: "Transactions processed" },
  { numeric: 98,   suffix: "%",   decimal: 0, label: "Satisfaction rate" },
  { numeric: null, display: "24/7",            label: "Expert support" },
];

function CountUp({ target, suffix, decimal, trigger }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger || target === null) return;
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [trigger, target]);

  if (target === null) return null;
  return <>{decimal ? val.toFixed(decimal) : Math.floor(val)}{suffix}</>;
}

export function WhyMoifone() {
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Stats bar */}
      <section className="border-b border-[var(--moifone-border)]/60 bg-[var(--moifone-bg)] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="rounded-2xl border border-[var(--moifone-border)] bg-white px-6 py-8 sm:px-8">
            <div className="flex flex-wrap sm:flex-nowrap">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.09, ease }}
                  className="flex w-1/2 flex-col items-center gap-2 py-4 text-center sm:w-auto sm:flex-1 sm:py-0"
                >
                  <p className="text-3xl font-bold tracking-tight text-[var(--moifone-primary)] sm:text-4xl">
                    {s.numeric !== null ? (
                      <CountUp target={s.numeric} suffix={s.suffix} decimal={s.decimal} trigger={inView} />
                    ) : (
                      s.display
                    )}
                  </p>
                  <p className="text-[11px] leading-snug text-[var(--moifone-muted)] sm:text-xs">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Moifone */}
      <section className="relative overflow-hidden border-b border-white/10 py-10 sm:py-14" style={{ background: "linear-gradient(135deg, #6b1a35 0%, #7b1e3a 50%, #9b2848 100%)" }}>
        {/* Subtle dot texture overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        {/* Soft glow blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-[5%]  top-[10%] h-72 w-72 rounded-full bg-white opacity-[0.04] blur-[80px]" />
          <div className="absolute right-[8%] bottom-[10%] h-80 w-80 rounded-full bg-white opacity-[0.05] blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Left-aligned header */}
          <FadeIn className="mb-6 max-w-xl sm:mb-8">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
              Why Moifone
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Intelligent management,{" "}
              <span className="text-[#f9c5d0]">quietly premium</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              We designed Moifone to feel calm and capable—so leaders see
              data-driven clarity, floor teams keep momentum, and automation
              stays in the background until it matters.
            </p>
            <p className="mt-5 text-sm italic text-white/40">
              "One stack. One rhythm—from live signals to settlement."
              <span className="mt-1 block not-italic text-[11px] text-white/30">
                — Moifone product principles
              </span>
            </p>
          </FadeIn>

          {/* Cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                  whileHover={{ y: -3, transition: { duration: 0.18, ease } }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm transition-colors duration-200 hover:border-white/18 hover:bg-white/[0.10]"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#f9c5d0]">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-xs font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
