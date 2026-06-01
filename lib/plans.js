const PLAN_LABELS = {
  basic: "Basic",
  standard: "Standard",
  pro: "Pro",
  custom: "Custom / Pay as you go",
};

export function normalizePlanId(raw) {
  if (!raw || typeof raw !== "string") return null;
  const key = raw.trim().toLowerCase();
  return PLAN_LABELS[key] ? key : null;
}

export function getPlanDisplayName(planId) {
  if (!planId) return null;
  const key = normalizePlanId(planId);
  return key ? PLAN_LABELS[key] : null;
}

export { PLAN_LABELS };
