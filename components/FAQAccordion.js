"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/data/faq";

export function FAQAccordion() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
          >
            <div
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-[#e8c5cf] bg-white shadow-md shadow-[#7b1e3a]/8"
                  : "border-gray-100 bg-white shadow-sm hover:border-[#e8c5cf] hover:shadow-md"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                {/* Number + question */}
                <div className="flex items-start gap-4">
                  <span className={`mt-0.5 shrink-0 text-[11px] font-black tabular-nums ${isOpen ? "text-[#7b1e3a]" : "text-gray-300"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-sm font-semibold leading-snug transition-colors ${isOpen ? "text-[#7b1e3a]" : "text-[#1a1020]"}`}>
                    {item.question}
                  </span>
                </div>

                {/* Toggle icon */}
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                  isOpen ? "bg-[#7b1e3a] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {isOpen
                    ? <Minus className="h-3.5 w-3.5" />
                    : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-5">
                      {/* Accent line */}
                      <div className="mb-3 h-px bg-gradient-to-r from-[#7b1e3a]/20 to-transparent" />
                      <p className="pl-9 text-sm leading-relaxed text-gray-500">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
