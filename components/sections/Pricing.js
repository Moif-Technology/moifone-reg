import { fetchPlansFromApi } from "@/lib/plansFromApi";
import { FadeIn } from "@/components/ui/FadeIn";
import { PricingCard } from "@/components/PricingCard";

export async function Pricing() {
  const pricingPlans = await fetchPlansFromApi();

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-hidden border-b border-[var(--moifone-border)]/60 py-14 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fdf9fa] via-[var(--moifone-bg)] to-[#faf5f7]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(480px,65vw)] w-[min(880px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(123,30,58,0.04)_0%,_transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--moifone-primary)]">
            Pricing
          </p>
          <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-[var(--moifone-ink)] sm:text-3xl">
            Plans that scale with your footprint
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--moifone-muted)] sm:text-[0.9375rem]">
            Choose a starting point, then refine during registration. Pro and
            Custom add deeper intelligence—analytics, forecasting, and
            automation—while every tier shares the same refined onboarding.
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:mt-11 lg:grid-cols-4 lg:gap-3 xl:gap-4">
          {pricingPlans.map((plan, index) => (
            <div key={plan.id} className="flex h-full min-h-0 w-full justify-center sm:justify-stretch">
              <div className="flex h-full w-full max-w-sm sm:max-w-none">
                <PricingCard plan={plan} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
