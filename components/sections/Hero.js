"use client";

import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, ShoppingCart, Package, BarChart2, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const stats = [
  { value: "10K+",  label: "Active Businesses" },
  { value: "500+",  label: "Branches Managed"  },
  { value: "50+",   label: "ERP Modules"        },
  { value: "99.9%", label: "Uptime SLA"         },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f9] via-white to-[#fdf5f7]">

      {/* Subtle dot-grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #7b1e3a 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Soft background blobs */}
      <motion.div aria-hidden
        className="pointer-events-none absolute right-[10%] top-[-8%] h-[420px] w-[420px] rounded-full bg-[#f9c5d0] opacity-25 blur-[100px]"
        animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-4%] h-[300px] w-[300px] rounded-full bg-[#fad4e0] opacity-20 blur-[80px]"
        animate={{ x: [0, -16, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Main layout */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-14 sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:gap-0 lg:px-14 xl:px-20">

        {/* ── LEFT: text ── */}
        <motion.div
          className="relative z-10 flex-1 max-w-xl"
          variants={container} initial="hidden" animate="show"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8c5cf] bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#7b1e3a] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7b1e3a]" />
              Intelligent ERP + POS Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 text-[1.85rem] font-black leading-[1.12] tracking-tight text-[#1a1020] sm:text-[2.6rem] sm:leading-[1.08] lg:text-[3.2rem]"
          >
            Set Up and Run<br />
            Your <span className="text-[#7b1e3a]">Business</span><br className="hidden sm:block" />{" "}
            Operations Smarter
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-gray-500"
          >
            Moifone unifies ERP and POS in one intelligent platform — from
            registration and setup to daily sales, inventory, and staff management.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-100 pt-6 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-base font-black text-[#1a1020] sm:text-lg">{s.value}</p>
                <p className="text-[10px] text-gray-400 sm:text-[11px]">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                href="/signup?plan=standard"
                className="rounded-full !px-8 !py-3.5 !text-[0.9rem] !font-bold shadow-lg shadow-[#7b1e3a]/25"
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", repeatDelay: 1 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Button>
            </motion.div>
            <motion.a
              href="#pricing"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-[#7b1e3a]"
              whileHover="hover"
            >
              View Pricing
              <motion.span variants={{ hover: { x: 4 } }} transition={{ duration: 0.2 }}>
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: floating cards — desktop only ── */}
        <div className="relative mt-16 hidden h-[460px] w-[460px] shrink-0 lg:mt-0 lg:block xl:w-[480px]">

          {/* Decorative diamond shapes */}
          <div className="pointer-events-none absolute right-[3%] top-[5%] h-14 w-14 rotate-45 rounded-xl bg-[#f9c5d0]/60" />
          <div className="pointer-events-none absolute right-[0%] top-[44%] h-9 w-9 rotate-45 rounded-lg bg-[#f9c5d0]/45" />
          <div className="pointer-events-none absolute bottom-[3%] left-[3%] h-11 w-11 rotate-45 rounded-xl bg-[#f9c5d0]/50" />
          <div className="pointer-events-none absolute left-[28%] top-[3%] h-7 w-7 rotate-45 rounded-md bg-[#f9c5d0]/40" />
          <div className="pointer-events-none absolute bottom-[22%] right-[28%] h-6 w-6 rotate-45 rounded-md bg-[#f9c5d0]/35" />

          {/* ── Featured card — ERP Platform (center, large, tilted) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="absolute left-[14%] top-[18%]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-48 w-48 flex-col items-center justify-center gap-4 rounded-[2rem] shadow-2xl shadow-[#7b1e3a]/30"
              style={{ background: "linear-gradient(145deg, #7b1e3a 0%, #c0486a 100%)" }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                <LayoutDashboard className="h-9 w-9 text-white" />
              </div>
              <p className="text-sm font-bold tracking-wide text-white">ERP Platform</p>
            </motion.div>
          </motion.div>

          {/* ── Below featured — Donut circle graph ── */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 7 }}
            animate={{ opacity: 1, y: 0, rotate: 7 }}
            transition={{ duration: 0.55, delay: 0.48, ease }}
            className="absolute left-[57%] top-[30%]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="flex w-[148px] items-center gap-3 rounded-[1.5rem] bg-white p-4 shadow-xl shadow-black/10"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" className="shrink-0">
                <circle cx="24" cy="24" r="18" fill="none" stroke="#f0e6ea" strokeWidth="6" />
                <motion.circle
                  cx="24" cy="24" r="18" fill="none"
                  stroke="#7b1e3a" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray="113.1"
                  initial={{ strokeDashoffset: 113.1 }}
                  animate={{ strokeDashoffset: 113.1 * 0.3 }}
                  transition={{ duration: 1.3, delay: 0.9, ease }}
                  transform="rotate(-90 24 24)"
                />
                <motion.circle
                  cx="24" cy="24" r="18" fill="none"
                  stroke="#d4738a" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray="113.1"
                  initial={{ strokeDashoffset: 113.1 }}
                  animate={{ strokeDashoffset: 113.1 * 0.65 }}
                  transition={{ duration: 1.3, delay: 1.05, ease }}
                  transform="rotate(79 24 24)"
                />
                <text x="24" y="28" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7b1e3a">70%</text>
              </svg>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#7b1e3a]" />
                  <span className="text-gray-600">ERP 70%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#d4738a]" />
                  <span className="text-gray-600">POS 30%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Top-right — Point of Sale ── */}
          <motion.div
            initial={{ opacity: 0, x: 28, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ duration: 0.55, delay: 0.5, ease }}
            className="absolute right-[2%] top-[2%]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="flex w-[148px] flex-col gap-2.5 rounded-[1.5rem] bg-white p-4 shadow-xl shadow-black/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1a1030]">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1a1020]">Point of Sale</p>
                <p className="mt-0.5 text-base font-black text-[#7b1e3a]">$12,480</p>
                <p className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-500">
                  <TrendingUp className="h-3 w-3" /> +8.4% today
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Bottom-left — Inventory ── */}
          <motion.div
            initial={{ opacity: 0, x: -28, rotate: -7 }}
            animate={{ opacity: 1, x: 0, rotate: -7 }}
            transition={{ duration: 0.55, delay: 0.6, ease }}
            className="absolute bottom-[14%] left-[0%]"
          >
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="flex w-[148px] flex-col gap-2.5 rounded-[1.5rem] bg-white p-4 shadow-xl shadow-black/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1a1030]">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1a1020]">Stock Control</p>
                <p className="mt-0.5 text-base font-black text-[#7b1e3a]">3,940</p>
                <p className="text-[10px] text-gray-400">Items in stock</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Bottom-right — Payroll & HR ── */}
          <motion.div
            initial={{ opacity: 0, y: 28, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 0.55, delay: 0.7, ease }}
            className="absolute bottom-[6%] right-[4%]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="flex w-[148px] flex-col gap-2.5 rounded-[1.5rem] bg-white p-4 shadow-xl shadow-black/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1a1030]">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1a1020]">Payroll & HR</p>
                <p className="mt-0.5 text-base font-black text-[#7b1e3a]">48 Staff</p>
                <p className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-500">
                  <BarChart2 className="h-3 w-3" /> 3 branches
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Top-left — Sales Graph ── */}
          <motion.div
            initial={{ opacity: 0, x: -24, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ duration: 0.55, delay: 0.42, ease }}
            className="absolute left-[0%] top-[2%]"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="w-[160px] rounded-[1.5rem] bg-white p-4 shadow-xl shadow-black/10"
            >
              <p className="text-[11px] font-bold text-[#1a1020]">Sales Growth</p>
              <p className="mt-0.5 text-base font-black text-[#7b1e3a]">+28%</p>
              <svg width="100%" height="44" viewBox="0 0 130 44" preserveAspectRatio="none" className="mt-2">
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7b1e3a" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#7b1e3a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,36 C18,32 28,18 42,20 C56,22 64,34 78,24 C92,14 108,8 130,10" fill="url(#heroGrad)" />
                <path d="M0,36 C18,32 28,18 42,20 C56,22 64,34 78,24 C92,14 108,8 130,10" fill="none" stroke="#7b1e3a" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="78" cy="24" r="3.5" fill="#7b1e3a" />
              </svg>
              <div className="mt-1.5 flex justify-between text-[8px] text-gray-400">
                {["Jan","Mar","May","Jul"].map(m => <span key={m}>{m}</span>)}
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative dots */}
          {[
            { top: "14%",  left: "62%",  s: 7,  d: 0.3 },
            { top: "50%",  right: "2%",  s: 9,  d: 0.6 },
            { top: "62%",  left: "44%",  s: 7,  d: 0.9 },
            { bottom: "5%",left: "36%",  s: 9,  d: 1.2 },
            { top: "36%",  left: "58%",  s: 6,  d: 0.5 },
          ].map((d, i) => (
            <motion.span
              key={i}
              animate={{ scale: [1, 1.7, 1], opacity: [0.3, 0.75, 0.3] }}
              transition={{ duration: 2.6 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: d.d }}
              className="absolute rounded-full bg-[#d4738a]"
              style={{ top: d.top, bottom: d.bottom, left: d.left, right: d.right, width: d.s, height: d.s }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
