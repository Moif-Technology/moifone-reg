"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const cardEase = [0.22, 1, 0.36, 1];

export function PricingCard({ plan, index = 0 }) {
  const isCustom = plan.priceMonthly === "Custom";
  const href = `/signup?plan=${encodeURIComponent(plan.id)}`;
  const isPopular = plan.popular;
  const noteText = plan.cardNote?.trim() ?? "";

  return (
    <div className={`relative flex h-full min-h-0 ${isPopular ? "lg:z-[1]" : ""}`}>
      {isPopular && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-[1.35rem] bg-gradient-to-b from-[#7b1e3a]/[0.07] via-[#7b1e3a]/[0.02] to-transparent opacity-90 blur-xl"
        />
      )}

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.45,
          delay: index * 0.07,
          ease: cardEase,
        }}
        whileHover={{
          y: -3,
          scale: isPopular ? 1.006 : 1.003,
          transition: { duration: 0.3, ease: cardEase },
        }}
        className={`relative flex h-full w-full flex-col rounded-2xl border bg-white transition-shadow duration-300 ease-out ${
          isPopular
            ? "border-[#e5d0d6]/90 px-4 pb-5 pt-8 shadow-[0_2px_20px_-4px_rgba(26,20,24,0.06),0_8px_28px_-8px_rgba(123,30,58,0.06)] ring-1 ring-[#7b1e3a]/[0.07] hover:shadow-[0_8px_28px_-6px_rgba(26,20,24,0.08),0_14px_40px_-10px_rgba(123,30,58,0.08)] sm:px-5 sm:pb-5"
            : "border-[#f0e8eb]/95 px-4 pb-5 pt-8 shadow-[0_1px_16px_-2px_rgba(26,20,24,0.05),0_6px_24px_-8px_rgba(26,20,24,0.04)] hover:shadow-[0_6px_24px_-4px_rgba(26,20,24,0.07),0_12px_32px_-10px_rgba(26,20,24,0.05)] sm:px-5 sm:pb-5"
        }`}
      >
        {isPopular && (
          <div className="absolute left-1/2 top-0 z-[2] -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex items-center rounded-full border border-[#e8d4dc] bg-white px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--moifone-primary)] shadow-sm">
              Most Popular
            </span>
          </div>
        )}

        {/* Header: label, plan name, description — centered */}
        <div className="shrink-0 px-0.5 text-center">
          {plan.audienceLabel && (
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--moifone-muted)]/80">
              {plan.audienceLabel}
            </p>
          )}
          <h3 className="mt-1.5 text-lg font-bold tracking-tight text-[var(--moifone-ink)]">
            {plan.name}
          </h3>
          <p className="mx-auto mt-2 min-h-[2.5rem] max-w-[15.5rem] text-[13px] leading-snug text-[var(--moifone-muted)]">
            {plan.description}
          </p>
        </div>

        {/* Price — centered */}
        <div className="mt-5 shrink-0 text-center">
          <div className="flex flex-wrap items-end justify-center gap-x-1.5 gap-y-0">
            <span className="text-[1.875rem] font-semibold leading-none tracking-tight text-[var(--moifone-ink)] sm:text-[2rem]">
              {plan.priceMonthly}
            </span>
            {!isCustom && (
              <span className="pb-0.5 text-xs font-medium text-[var(--moifone-muted)]">
                / {plan.period}
              </span>
            )}
            {isCustom && (
              <span className="text-xs font-medium capitalize text-[var(--moifone-muted)]">
                {plan.period}
              </span>
            )}
          </div>
          {!isCustom ? (
            <p className="mx-auto mt-1.5 min-h-[2rem] max-w-[13rem] text-[11px] leading-tight text-[var(--moifone-muted)]/85">
              {plan.priceYearly}/yr billed annually{" "}
              <span className="opacity-70">(placeholder)</span>
            </p>
          ) : (
            <p className="mx-auto mt-1.5 min-h-[2rem] text-[11px] leading-tight text-transparent">
              &nbsp;
            </p>
          )}
        </div>

        {/* Middle: features grow; spacer pushes note + CTA to bottom */}
        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <ul className="flex flex-col gap-2 text-left">
            {plan.features.map((line) => (
              <li
                key={line}
                className="flex gap-2.5 text-xs leading-tight text-[var(--moifone-ink)]/90"
              >
                <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--moifone-rose-mist)]/90 text-[var(--moifone-primary)]">
                  <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                </span>
                <span className="text-[var(--moifone-muted)]">{line}</span>
              </li>
            ))}
          </ul>
          <div className="min-h-[1px] flex-1" aria-hidden />

          <div className="shrink-0 pt-4">
            <div className="flex min-h-[2.75rem] items-center justify-center text-center">
              {noteText ? (
                <p className="text-[11px] leading-snug text-[var(--moifone-muted)]/90">
                  {noteText}
                </p>
              ) : null}
            </div>
            <Link
              href={href}
              className={`mt-3 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--moifone-primary)] ${
                isPopular
                  ? "bg-[var(--moifone-primary)] text-white shadow-[0_2px_10px_-2px_rgba(123,30,58,0.3)] hover:bg-[#6c1a33] hover:shadow-[0_4px_16px_-2px_rgba(123,30,58,0.22)] active:scale-[0.99]"
                  : "bg-[var(--moifone-primary)] text-white shadow-[0_2px_8px_-2px_rgba(123,30,58,0.22)] hover:bg-[#6c1a33] hover:brightness-[1.02] hover:shadow-[0_4px_14px_-2px_rgba(123,30,58,0.18)] active:scale-[0.99]"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
