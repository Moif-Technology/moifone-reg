import { pricingPlans } from "@/data/pricing";

/**
 * Loads plans from the unified API (core.plan_master). Falls back to static
 * data/pricing.js if the API is unreachable or unset — so the site still builds.
 */
export async function fetchPlansFromApi() {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!base) return pricingPlans;

  try {
    const res = await fetch(`${base}/api/plans`, { cache: "no-store" });
    if (!res.ok) return pricingPlans;
    const data = await res.json();
    const plans = data.plans;
    if (Array.isArray(plans) && plans.length > 0) return plans;
  } catch {
    /* API down or wrong URL — use static fallback */
  }

  return pricingPlans;
}
