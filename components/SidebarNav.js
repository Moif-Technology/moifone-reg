"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, LayoutGrid, Tag, HelpCircle, Phone } from "lucide-react";

const links = [
  { icon: Home,        label: "Home",     href: "/",        id: "home" },
  { icon: LayoutGrid,  label: "Features", href: "#features", id: "features" },
  { icon: Tag,         label: "Pricing",  href: "#pricing",  id: "pricing" },
  { icon: HelpCircle,  label: "FAQ",      href: "#faq",      id: "faq" },
  { icon: Phone,       label: "Contact",  href: "#contact",  id: "contact" },
];

export function SidebarNav() {
  const [active, setActive]   = useState("home");
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sectionIds = links.map((l) => l.id).filter((id) => id !== "home");
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 120);
      if (y < 120) setActive("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ x: -56, opacity: 0 }}
      animate={visible ? { x: 0, opacity: 1 } : { x: -56, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-full border border-[var(--moifone-border)] bg-white/90 px-2.5 py-4 shadow-[0_8px_32px_-8px_rgba(123,30,58,0.14)] backdrop-blur-md xl:flex"
    >
      {links.map(({ icon: Icon, label, href, id }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={href}
            title={label}
            onClick={() => setActive(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--moifone-primary)]/40"
          >
            {/* Active pill — shared layoutId so it glides between items */}
            {isActive && (
              <motion.span
                layoutId="sidebar-pill"
                className="absolute inset-0 rounded-full bg-[var(--moifone-ink)]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            {/* Hover glow */}
            {!isActive && (
              <AnimatePresence>
                {hovered === id && (
                  <motion.span
                    key="hover-bg"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 rounded-full bg-[var(--moifone-rose-mist)]"
                  />
                )}
              </AnimatePresence>
            )}

            {/* Icon */}
            <motion.span
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
                isActive ? "text-white" : "text-[var(--moifone-muted)]"
              }`}
            >
              <Icon className="h-4 w-4" />
            </motion.span>

            {/* Tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.18 }}
                  className="pointer-events-none absolute left-[calc(100%+10px)] whitespace-nowrap rounded-lg border border-[var(--moifone-border)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--moifone-ink)] shadow-md"
                >
                  {label}
                  {/* Arrow */}
                  <span className="absolute -left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 rounded-sm border-b border-l border-[var(--moifone-border)] bg-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        );
      })}
    </motion.div>
  );
}
