"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { parsePhoneNumber } from "libphonenumber-js";
import { businessTypeOptions } from "@/data/signupOptions";
import { designationOptions } from "@/data/designationOptions";
import { getSetupHints } from "@/data/setupHints";
import { pricingPlans } from "@/data/pricing";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const initial = {
  companyName: "", businessType: "", firstName: "", lastName: "",
  designation: "", email: "", password: "", confirmPassword: "", phone: "",
};

const STEPS = [
  { id: 1, label: "Plan" },
  { id: 2, label: "Business" },
  { id: 3, label: "Personal" },
  { id: 4, label: "Security" },
];

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

function countryNameFromPhone(e164) {
  if (!e164) return undefined;
  try {
    const p = parsePhoneNumber(e164);
    if (!p?.country) return undefined;
    return new Intl.DisplayNames(["en"], { type: "region" }).of(p.country);
  } catch { return undefined; }
}

function plansToOptions(plans) {
  return plans.map((p) => ({
    id: p.id,
    label: p.priceMonthly && p.priceMonthly !== "Custom"
      ? `${p.name} — ${p.priceMonthly}/${p.period || "month"}`
      : `${p.name} — ${p.priceMonthly || "Custom"}`,
  }));
}

const fallbackPlanOptions = plansToOptions(pricingPlans);

function getBrowserApiBase() {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (typeof window === "undefined" || !configured) return configured;
  try {
    const url = new URL(configured);
    const pageHost = window.location.hostname;
    const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1";
    if (isLocal && pageHost && pageHost !== "localhost") {
      url.hostname = pageHost;
      return url.toString().replace(/\/$/, "");
    }
  } catch { return configured; }
  return configured;
}

export function SignupForm({ initialPlanId }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [planOptions, setPlanOptions] = useState(fallbackPlanOptions);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const base = getBrowserApiBase();
    if (!base) return;
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 2500);
    fetch(`${base}/api/plans`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        setPlanOptions(data?.plans?.length ? plansToOptions(data.plans) : fallbackPlanOptions);
      })
      .catch(() => { if (!cancelled) setPlanOptions(fallbackPlanOptions); })
      .finally(() => window.clearTimeout(timeoutId));
    return () => { cancelled = true; window.clearTimeout(timeoutId); controller.abort(); };
  }, []);

  useEffect(() => {
    if (!planOptions.length) return;
    const fromUrl = initialPlanId && planOptions.some((p) => p.id === initialPlanId);
    if (fromUrl) { setSelectedPlanId(initialPlanId); return; }
    setSelectedPlanId((prev) => prev || planOptions[0].id);
  }, [planOptions, initialPlanId]);

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!selectedPlanId) next.selectedPlanId = "Required";
    if (!values.companyName.trim()) next.companyName = "Required";
    if (!values.businessType) next.businessType = "Required";
    if (!values.firstName.trim()) next.firstName = "Required";
    if (!values.lastName.trim()) next.lastName = "Required";
    if (!values.designation) next.designation = "Required";
    if (!values.email.trim()) next.email = "Required";
    else if (!isValidEmail(values.email)) next.email = "Invalid email";
    if (!values.password) next.password = "Required";
    else if (values.password.length < 8) next.password = "Min. 8 characters";
    if (values.password !== values.confirmPassword) next.confirmPassword = "Passwords don't match";
    if (values.phone && !isValidPhoneNumber(values.phone)) next.phone = "Invalid phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setApiError("");
    const baseUrl = getBrowserApiBase();
    if (!baseUrl) { setApiError("Registration is not configured (missing NEXT_PUBLIC_API_URL)."); return; }
    const payload = {
      selectedPlan: selectedPlanId, setupBlueprint: getSetupHints(values.businessType),
      companyName: values.companyName, businessType: values.businessType,
      firstName: values.firstName, lastName: values.lastName,
      designation: values.designation, email: values.email,
      password: values.password, phone: values.phone || null,
      country: countryNameFromPhone(values.phone) || null,
    };
    setSubmitting(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        signal: controller.signal, body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setApiError(data.message || `Registration failed (${res.status}).`); return; }
      setSubmitted(true);
    } catch {
      setApiError("Could not reach the server. Check your connection and try again.");
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  }

  const inp =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[var(--moifone-ink)] transition-all placeholder:text-gray-400 focus:border-[#7b1e3a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7b1e3a]/10";

  const lbl = "mb-1 block text-[11px] font-semibold text-gray-500";

  const errMsg = "mt-0.5 text-[10px] text-red-500";


  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-10 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-7 w-7 text-emerald-600" />
        </div>
        <h3 className="text-base font-bold text-[var(--moifone-ink)]">Workspace registered!</h3>
        <p className="max-w-xs text-xs text-gray-500">Sign in to the ERP back office with your email and password.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      {/* ── Step tracker ── */}
      <div className="flex items-center overflow-x-auto pb-1">
        {STEPS.map((s, i) => {
          const done =
            (s.id === 1 && !!selectedPlanId) ||
            (s.id === 2 && !!values.companyName && !!values.businessType) ||
            (s.id === 3 && !!values.firstName && !!values.lastName && !!values.designation) ||
            (s.id === 4 && !!values.email && !!values.password);
          return (
            <div key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all ${done ? "bg-[#7b1e3a] text-white shadow-sm" : "bg-gray-100 text-gray-400"}`}>
                  {done ? <Check className="h-3.5 w-3.5" /> : s.id}
                </span>
                <span className={`text-[9px] font-semibold uppercase tracking-wide ${done ? "text-[#7b1e3a]" : "text-gray-300"}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-2 mb-4 h-px flex-1 transition-all" style={{ background: done ? "#7b1e3a" : "#e5e7eb" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Fields ── */}
      <div className="space-y-3">

        {/* Plan */}
        <div>
          <label className={lbl}>Select plan <span className="text-[#7b1e3a]">*</span></label>
          <select value={selectedPlanId}
            onChange={(e) => { setSelectedPlanId(e.target.value); setErrors((er) => ({ ...er, selectedPlanId: undefined })); }}
            className={inp}>
            {planOptions.length === 0
              ? <option value="">Loading…</option>
              : planOptions.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)
            }
          </select>
          {errors.selectedPlanId && <p className={errMsg}>{errors.selectedPlanId}</p>}
        </div>

        {/* Business */}
        <div>
          <label className={lbl}>Company / business name <span className="text-[#7b1e3a]">*</span></label>
          <input value={values.companyName} onChange={(e) => setField("companyName", e.target.value)}
            className={inp} placeholder="Registered or trading name" autoComplete="organization" />
          {errors.companyName && <p className={errMsg}>{errors.companyName}</p>}
        </div>
        <div>
          <label className={lbl}>Business type <span className="text-[#7b1e3a]">*</span></label>
          <select value={values.businessType} onChange={(e) => setField("businessType", e.target.value)} className={inp}>
            <option value="">Select type</option>
            {businessTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {errors.businessType && <p className={errMsg}>{errors.businessType}</p>}
        </div>

        {/* Personal */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={lbl}>First name <span className="text-[#7b1e3a]">*</span></label>
            <input value={values.firstName} onChange={(e) => setField("firstName", e.target.value)}
              className={inp} placeholder="First name" autoComplete="given-name" />
            {errors.firstName && <p className={errMsg}>{errors.firstName}</p>}
          </div>
          <div>
            <label className={lbl}>Last name <span className="text-[#7b1e3a]">*</span></label>
            <input value={values.lastName} onChange={(e) => setField("lastName", e.target.value)}
              className={inp} placeholder="Last name" autoComplete="family-name" />
            {errors.lastName && <p className={errMsg}>{errors.lastName}</p>}
          </div>
        </div>
        <div>
          <label className={lbl}>Designation <span className="text-[#7b1e3a]">*</span></label>
          <select value={values.designation} onChange={(e) => setField("designation", e.target.value)} className={inp}>
            {designationOptions.map((o) => <option key={o.value || "empty"} value={o.value}>{o.label}</option>)}
          </select>
          {errors.designation && <p className={errMsg}>{errors.designation}</p>}
        </div>
        <div>
          <label className={lbl}>Phone <span className="text-gray-400 font-normal">(optional)</span></label>
          <PhoneInput
            international defaultCountry="IN" countryCallingCodeEditable={false} limitMaxLength
            value={values.phone || undefined} onChange={(v) => setField("phone", v || "")}
            className="moifone-phone w-full"
            numberInputProps={{ autoComplete: "tel" }}
          />
          {errors.phone && <p className={errMsg}>{errors.phone}</p>}
        </div>

        {/* Security */}
        <div>
          <label className={lbl}>Email address <span className="text-[#7b1e3a]">*</span></label>
          <input type="email" value={values.email} onChange={(e) => setField("email", e.target.value)}
            className={inp} placeholder="you@company.com" autoComplete="email" />
          {errors.email && <p className={errMsg}>{errors.email}</p>}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={lbl}>Password <span className="text-[#7b1e3a]">*</span></label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={values.password}
                onChange={(e) => setField("password", e.target.value)}
                className={`${inp} pr-8`} placeholder="Min. 8 chars" autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
            {errors.password && <p className={errMsg}>{errors.password}</p>}
          </div>
          <div>
            <label className={lbl}>Confirm password <span className="text-[#7b1e3a]">*</span></label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} value={values.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                className={`${inp} pr-8`} placeholder="Repeat password" autoComplete="new-password" />
              <button type="button" onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className={errMsg}>{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>

      {/* Alerts */}
      {apiError && (
        <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">{apiError}</div>
      )}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            Workspace registered! Sign in with your email and password.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <Button
        type="submit" variant="primary"
        className="w-full !rounded-xl !py-2.5 !text-sm !font-semibold shadow-lg shadow-[#7b1e3a]/20"
        disabled={submitting || planOptions.length === 0}
      >
        {submitting ? "Submitting…" : "Complete registration"}
      </Button>
    </form>
  );
}
