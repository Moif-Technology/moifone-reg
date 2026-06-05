"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { SignupForm } from "@/components/signup/SignupForm";
import { normalizePlanId } from "@/lib/plans";

const ease = [0.22, 1, 0.36, 1];
const spring = { type: "spring", stiffness: 280, damping: 26 };

const benefits = [
  "ERP + POS provisioning with intelligent defaults",
  "Guided configuration tailored to your business type",
  "Inventory, staff & sales — unified from day one",
  "Your data is never sold or shared",
];

export function SignupContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("plan");
  const initialPlanId = normalizePlanId(raw);

  return (
    <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">

      {/* Left brand panel */}
      <div
        className="relative hidden w-[38%] flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14"
        style={{ background: "linear-gradient(160deg, #7b1e3a 0%, #9a2d4a 55%, #b03460 100%)" }}
      >
        {/* Glow blobs */}
        <div className="pointer-events-none absolute right-[-60px] top-[20%] h-64 w-64 rounded-full bg-[#7b1e3a] opacity-20 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-[10%] left-[-40px] h-48 w-48 rounded-full bg-[#a83258] opacity-15 blur-[70px]" />

        {/* Top: back link */}
        <Link
          href="/"
          className="relative inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Center content */}
        <motion.div
          className="relative"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { ...spring } } }}>
            <BrandMark variant="light" className="text-xl" />
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { ...spring } } }}
            className="mt-8 text-2xl font-bold leading-snug text-white xl:text-[1.65rem]"
          >
            Start running your business<br />smarter today
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { ...spring } } }}
            className="mt-3 text-sm leading-relaxed text-white/50"
          >
            One platform for ERP + POS — register in minutes, go live with confidence.
          </motion.p>
          <ul className="mt-8 space-y-3.5">
            {benefits.map((b, i) => (
              <motion.li
                key={b}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { ...spring, delay: i * 0.06 } } }}
                className="flex items-start gap-2.5 text-sm text-white/65"
              >
                <motion.span whileHover={{ scale: 1.2, transition: spring }} className="mt-0.5 shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-[#d4738a]" />
                </motion.span>
                {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom note */}
        <p className="relative text-xs text-white/25">© 2025 Moifone · Privacy first</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-[var(--moifone-bg)] lg:h-screen">

        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-[var(--moifone-border)] bg-white/80 px-5 py-4 backdrop-blur-sm lg:hidden">
          <BrandMark />
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-[var(--moifone-muted)] hover:text-[var(--moifone-ink)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>

        {/* Centered content */}
        <div className="flex flex-1 items-start justify-center px-5 py-8 sm:px-8 lg:items-center lg:px-8 xl:px-12">
          <div className="w-full max-w-lg">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="mb-7"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b1e3a]">
                Registration
              </p>
              <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[var(--moifone-ink)]">
                Create your workspace
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {initialPlanId
                  ? "Your selected plan is pre-filled below."
                  : "Select a plan and fill in your details to get started."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
            >
              <SignupForm initialPlanId={initialPlanId} />
            </motion.div>

            <p className="mt-5 text-center text-xs text-gray-400">
              Already have an account?{" "}
              <Link href="/#pricing" className="font-semibold text-[#7b1e3a] hover:underline">
                View pricing
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
