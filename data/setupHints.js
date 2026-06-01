/**
 * Blueprint for setup prioritization by business type.
 * Intended for future Moifone Assistant / smart configuration APIs.
 */
export const setupHintsByBusinessType = {
  restaurant: {
    summary: "Front-of-house service, kitchen sync, and shift-aware reporting.",
    modules: ["Service layouts & courses", "Kitchen / prep alignment", "Tips & gratuity handling"],
  },
  retail_shop: {
    summary: "SKU velocity, promotions, and fast checkout workflows.",
    modules: ["Variant & barcode depth", "Promotional pricing", "Queue-friendly POS"],
  },
  supermarket: {
    summary: "High-SKU catalogs, scales, and multi-lane throughput.",
    modules: ["Bulk & weighted items", "Department rollups", "Peak-hour POS tuning"],
  },
  pharmacy: {
    summary: "Compliance-friendly controls and careful inventory tracking.",
    modules: ["Batch & expiry discipline", "Restricted-item rules", "Audit-friendly trails"],
  },
  cafe: {
    summary: "Quick tickets, modifiers, and loyalty-friendly receipts.",
    modules: ["Modifier-heavy menus", "Peak rush layouts", "Simple loyalty hooks"],
  },
  bakery: {
    summary: "Production batches, pre-orders, and freshness-led stock.",
    modules: ["Production planning", "Pre-order windows", "Waste-aware inventory"],
  },
  wholesale: {
    summary: "Volume pricing, credit terms, and fulfillment visibility.",
    modules: ["Tiered pricing", "Credit & AR alignment", "Delivery / pick workflows"],
  },
  service_business: {
    summary: "Appointments, deposits, and staff utilization.",
    modules: ["Scheduling alignment", "Deposit & milestone billing", "Utilization views"],
  },
  other: {
    summary: "A neutral baseline we refine with you after registration.",
    modules: ["Core ERP + POS", "Configurable roles", "Phased module rollout"],
  },
};

export function getSetupHints(businessTypeValue) {
  if (!businessTypeValue) return null;
  return setupHintsByBusinessType[businessTypeValue] ?? setupHintsByBusinessType.other;
}
