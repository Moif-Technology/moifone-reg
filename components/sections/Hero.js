"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease } },
};

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden border-b border-[var(--moifone-border)]/60 bg-gradient-to-br from-[#fdf5f7] via-[#fceef2] to-[#fdf5f7]">

      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #7b1e3a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Drifting background blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[60%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#f9c5d0] opacity-30 blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-5%] top-[40%] h-[380px] w-[380px] rounded-full bg-[#e8c5f0] opacity-20 blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Main grid */}
      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:py-20 xl:pl-20">

        {/* Left: text content */}
        <motion.div
          className="relative z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[var(--moifone-muted)] backdrop-blur-sm">
              Intelligent ERP + POS — register &amp; onboard
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 text-[2.75rem] font-black leading-[1.04] tracking-tight text-[var(--moifone-ink)] sm:text-5xl lg:text-[3.5rem]"
          >
            Set up and run your{" "}
            <span className="text-[var(--moifone-primary)]">business smarter</span>
            —with one intelligent ERP&nbsp;+&nbsp;POS platform
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-[var(--moifone-muted)] sm:text-lg"
          >
            Moifone blends registration, configuration, and daily operations
            with subtle automation and intelligent signals—so you move faster,
            see clearer, and keep ERP and POS in lockstep from day one.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Button
                href="/signup?plan=standard"
                className="rounded-full !px-9 !py-4 !text-[0.95rem] !font-bold !tracking-wide shadow-lg shadow-[#7b1e3a]/25 hover:shadow-xl hover:shadow-[#7b1e3a]/30"
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", repeatDelay: 1 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Button>
            </motion.div>

            <motion.a
              href="#pricing"
              whileHover="hover"
              className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--moifone-muted)] transition-colors hover:text-[var(--moifone-ink)]"
            >
              View Pricing
              <motion.span
                variants={{ hover: { x: 4 } }}
                transition={{ duration: 0.2, ease }}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* Feature hints */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-6 text-xs text-[var(--moifone-muted)]"
          >
            <div>
              <p className="font-semibold text-[var(--moifone-ink)]">Guided, intelligent setup</p>
              <p className="mt-1">From profile to go-live—with sensible defaults</p>
            </div>
            <div className="hidden h-8 w-px bg-[var(--moifone-border)] sm:block" />
            <div>
              <p className="font-semibold text-[var(--moifone-ink)]">Automated insight layer</p>
              <p className="mt-1">Signals for inventory, sales &amp; staff (Pro+)</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: floating console card */}
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.4, ease }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_40px_100px_-20px_rgba(123,30,58,0.35)]"
            >
              {/* Card header — dark gradient */}
              <div
                className="relative px-5 pb-5 pt-5"
                style={{ background: "linear-gradient(135deg, #1a1418 0%, #2a1020 100%)" }}
              >
                {/* Glow blob inside header */}
                <div className="pointer-events-none absolute right-4 top-2 h-24 w-24 rounded-full bg-[#7b1e3a] opacity-30 blur-[40px]" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                      Setup preview
                    </p>
                    <p className="mt-1 text-base font-bold text-white">
                      Moifone Console
                    </p>
                  </div>
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#d4738a]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4738a]" />
                    Live
                  </motion.span>
                </div>

                {/* Progress rows */}
                <div className="relative mt-5 space-y-3">
                  {[
                    { label: "Company profile",  pct: 100, color: "#a02848" },
                    { label: "POS terminals",    pct: 72,  color: "#7b1e3a" },
                    { label: "Inventory catalog",pct: 45,  color: "#9b2848" },
                    { label: "Staff & roles",    pct: 28,  color: "#6b1a35" },
                  ].map((row, i) => (
                    <div key={row.label}>
                      <div className="mb-1.5 flex items-center justify-between text-[11px]">
                        <span className="text-white/70">{row.label}</span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                          className="font-semibold text-white/90"
                        >
                          {row.pct}%
                        </motion.span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${row.pct}%` }}
                          transition={{ duration: 1, delay: 0.65 + i * 0.12, ease }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(to right, ${row.color}, #d4738a)` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card footer — light stats */}
              <div className="grid grid-cols-2 divide-x divide-[var(--moifone-border)] border-t border-[var(--moifone-border)] bg-white">
                {[
                  { label: "Today's sales",   value: "$12,480", trend: "+8.4%" },
                  { label: "Active branches", value: "3",       trend: "+1"    },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 1.2 + i * 0.1, ease }}
                    className="flex flex-col gap-1 p-4"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--moifone-muted)]">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold tabular-nums text-[var(--moifone-ink)]">
                      {stat.value}
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-500">
                      {stat.trend}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
