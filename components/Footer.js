import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const quick = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "/signup", label: "Register" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[var(--moifone-border)] bg-white/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandMark className="text-xl" href="/" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--moifone-muted)]">
              Moifone is an intelligent ERP + POS platform—unifying operations,
              automation, and data-driven signals for teams who want clarity,
              control, and room to grow.
            </p>
            <p className="mt-4 text-sm text-[var(--moifone-muted)]">
              <span className="font-medium text-[var(--moifone-ink)]">
                Contact
              </span>
              <br />
              <a
                href="mailto:hello@moifone.com"
                className="text-[var(--moifone-primary)] hover:underline"
              >
                hello@moifone.com
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--moifone-muted)]">
              Quick links
            </p>
            <ul className="mt-4 space-y-2">
              {quick.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--moifone-ink)]/80 hover:text-[var(--moifone-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--moifone-muted)]">
              Start
            </p>
            <p className="mt-4 text-sm text-[var(--moifone-muted)]">
              Ready to register your business and configure Moifone?
            </p>
            <Link
              href="/signup"
              className="mt-3 inline-flex text-sm font-medium text-[var(--moifone-primary)] hover:underline"
            >
              Begin registration →
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--moifone-border)] pt-8 text-xs text-[var(--moifone-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Moifone. All rights reserved.</span>
          <span className="text-[var(--moifone-muted)]/80">
            Intelligent ERP + POS registration &amp; setup
          </span>
        </div>
      </div>
    </footer>
  );
}
