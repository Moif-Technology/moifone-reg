import { FadeIn } from "@/components/ui/FadeIn";
import { FAQAccordion } from "@/components/FAQAccordion";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--moifone-primary)]">
                FAQ
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--moifone-ink)] sm:text-3xl">
                Answers before you register
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--moifone-muted)] sm:text-base">
                Straightforward answers on operations, intelligence tiers, and
                how Moifone supports data-informed decisions—so you can move
                forward with confidence.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
