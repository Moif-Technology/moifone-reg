"use client";

import { motion } from "framer-motion";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ArrowRight, MessageCircle } from "lucide-react";

const COLS = 10;
const ROWS = 7;
const CELL = 72;
const GAP  = 10;

const tiles = Array.from({ length: COLS * ROWS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const cx = (COLS - 1) / 2;
  const cy = (ROWS - 1) / 2;
  const dist = Math.sqrt(Math.pow(col - cx, 2) + Math.pow(row - cy, 2));
  const maxDist = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2));
  const intensity = Math.max(0, 1 - dist / maxDist);
  return { row, col, intensity };
});

const BG_W = COLS * CELL + (COLS - 1) * GAP;
const BG_H = ROWS * CELL + (ROWS - 1) * GAP;

function GlassTiles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 w-full overflow-hidden"
      style={{ height: BG_H }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
          gap: GAP,
          width: BG_W,
          height: BG_H,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {tiles.map(({ row, col, intensity }) => {
          const alpha = 0.04 + intensity * 0.10;
          const tileBase =
            intensity > 0.70
              ? `rgba(212,115,138,${alpha})`
              : intensity > 0.40
              ? `rgba(160,40,72,${alpha})`
              : `rgba(123,30,58,${alpha * 0.65})`;

          const shine = `rgba(255,255,255,${0.55 + intensity * 0.35})`;

          return (
            <motion.div
              key={`${row}-${col}`}
              initial={{ opacity: 0, scale: 0.65 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.38,
                delay: (row + col) * 0.018,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                borderRadius: 16,
                background: `radial-gradient(circle at 36% 28%, ${shine}, ${tileBase})`,
                boxShadow: [
                  `inset 0 1.5px 2px rgba(255,255,255,0.7)`,
                  `inset 0 -1px 1px rgba(100,10,30,0.06)`,
                  `0 2px 8px rgba(100,10,30,${0.02 + intensity * 0.04})`,
                ].join(", "),
                border: "1px solid rgba(255,255,255,0.55)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28">

      {/* Glassmorphic tiles */}
      <GlassTiles />

      {/* Subtle dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle,#7b1e3a 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Content ── */}
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
