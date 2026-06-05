"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/data/faq";

const spring = { type: "spring", stiffness: 300, damping: 30 };
const ease   = [0.16, 1, 0.3, 1];

export function FAQAccordion() {
  const [openId, setOpenId]   = useState("insights");   // item 03 open by default
  const [hovered, setHovered] = useState(null);

  return (
    <div className="space-y-2.5">
      {faqItems.map((item, index) => {
        const isOpen  = openId === item.id;
        const isHover = hovered === item.id;
        const num     = String(index + 1).padStart(2, "0");

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-24px" }}
            transition={{ duration: 0.42, delay: index * 0.06, ease }}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.div
              animate={{
                borderColor: isOpen ? "#e8c5cf" : isHover ? "#f0d5dc" : "#e5e7eb",
                backgroundColor: isOpen ? "#fff8f9" : "#ffffff",
              }}
              transition={spring}
              className="overflow-hidden rounded-xl border"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 px-5 py-4 text-left focus:outline-none"
              >
                {/* Number */}
                <motion.span
                  animate={{ color: isOpen ? "#7b1e3a" : isHover ? "#b03460" : "#d1d5db" }}
                  transition={{ duration: 0.22 }}
                  className="shrink-0 pt-0.5 text-[11px] font-black tabular-nums leading-none"
                >
                  {num}
                </motion.span>

                {/* Question */}
                <motion.span
                  animate={{ color: isOpen ? "#7b1e3a" : isHover ? "#1a1020" : "#374151" }}
                  transition={{ duration: 0.22 }}
                  className="flex-1 text-sm font-semibold leading-snug"
                >
                  {item.question}
                </motion.span>

                {/* Toggle icon */}
                <motion.span
                  animate={{
                    backgroundColor: isOpen ? "#7b1e3a" : isHover ? "#fceef2" : "#f3f4f6",
                    scale: isHover && !isOpen ? 1.1 : 1,
                  }}
                  transition={spring}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isOpen ? "minus" : "plus"}
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.18, ease }}
                      className={isOpen ? "text-white" : "text-gray-400"}
                    >
                      {isOpen
                        ? <Minus className="h-3 w-3" />
                        : <Plus  className="h-3 w-3" />}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              </button>

              {/* Expanding answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height:  { type: "spring", stiffness: 260, damping: 28 },
                      opacity: { duration: 0.2, ease },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -8 }}
                      animate={{ y: 0 }}
                      exit={{ y: -6 }}
                      transition={{ duration: 0.24, ease }}
                      className="px-5 pb-4 pl-[3.25rem]"
                    >
                      <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.32, ease, delay: 0.06 }}
                        className="mb-3 h-px bg-gradient-to-r from-[#7b1e3a]/20 to-transparent"
                      />
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.1, ease }}
                        className="text-sm leading-relaxed text-gray-500"
                      >
                        {item.answer}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
