"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Shield,
  Sparkles,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { SignupForm } from "@/components/signup/SignupForm";
import { normalizePlanId } from "@/lib/plans";

const benefits = [
  "Structured profile we can map to intelligent defaults as your workspace goes live",
  "ERP + POS provisioning with room for guided, type-aware configuration later",
  "Operational controls, reporting depth, and automation scaled to your plan",
];

export function SignupContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("plan");
  const initialPlanId = normalizePlanId(raw);

  return (
    <div className="min-h-screen bg-[var(--moifone-bg)]">
      <header className="border-b border-[var(--moifone-border)] bg-[var(--moifone-bg)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--moifone-muted)] hover:text-[var(--moifone-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to pricing
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 rounded-2xl border border-[var(--moifone-border)] bg-white/90 px-5 py-4 shadow-sm backdrop-blur-sm sm:px-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--moifone-primary)]">
            Registration
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--moifone-ink)]">
            Choose your plan and register
          </p>
          <p className="mt-2 text-sm text-[var(--moifone-muted)]">
            Select your plan in the form. Compare tiers anytime on{" "}
            <Link href="/#pricing" className="font-medium text-[var(--moifone-primary)] hover:underline">
              pricing
            </Link>
            {initialPlanId ? " — we pre-selected the plan from your link." : "."}
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24 space-y-6">
              <div className="space-y-6 rounded-[1.75rem] border border-[var(--moifone-border)] bg-gradient-to-b from-white to-[#fdf8f9] p-6 shadow-sm sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--moifone-border)] bg-white/80 px-3 py-1 text-xs font-medium text-[var(--moifone-muted)]">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--moifone-primary)]" />
                  Intelligent onboarding
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-[var(--moifone-ink)] sm:text-[1.65rem] leading-tight">
                  Create your workspace—ready for smart setup
                </h1>
                <p className="text-sm leading-relaxed text-[var(--moifone-muted)]">
                  Your answers establish a clean operational baseline. Downstream,
                  Moifone can prioritize modules, defaults, and intelligent
                  suggestions based on business type—starting with the blueprint
                  preview beside your form.
                </p>
                <ul className="space-y-3">
                  {benefits.map((line) => (
                    <li key={line} className="flex gap-2.5 text-sm text-[var(--moifone-ink)]/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--moifone-primary)]" />
                      <span className="leading-relaxed text-[var(--moifone-muted)]">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-3 rounded-xl border border-[var(--moifone-border)] bg-white/70 p-4">
                  <Shield className="h-5 w-5 shrink-0 text-[var(--moifone-primary)]" />
                  <p className="text-xs leading-relaxed text-[var(--moifone-muted)]">
                    Your information is used only to prepare your Moifone
                    environment. We never sell registration data.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-dashed border-[#dcc9cf] bg-white/50 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--moifone-primary)]">
                  <MessageSquare className="h-4 w-4" />
                  Moifone Assistant
                  <span className="rounded-md bg-[var(--moifone-rose-mist)] px-1.5 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-[var(--moifone-muted)]">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--moifone-muted)]">
                  A conversational guide inside setup and daily operations—answering
                  questions, surfacing next-best actions, and explaining signals in
                  plain language. This registration flow is structured so Assistant
                  can plug in without rework.
                </p>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-[1.75rem] border border-[var(--moifone-border)] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(26,20,24,0.18)] sm:p-8">
              <h2 className="text-lg font-semibold text-[var(--moifone-ink)]">
                Business &amp; account details
              </h2>
              <p className="mt-1 text-sm text-[var(--moifone-muted)]">
                Fields marked with <span className="text-[var(--moifone-primary)]">*</span> are
                required. Your business type unlocks a{" "}
                <span className="font-medium text-[var(--moifone-ink)]/90">
                  setup blueprint preview
                </span>{" "}
                for future smart configuration.
              </p>
              <div className="mt-8">
                <SignupForm initialPlanId={initialPlanId} />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
