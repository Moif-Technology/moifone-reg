"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { parsePhoneNumber } from "libphonenumber-js";
import { businessTypeOptions } from "@/data/signupOptions";
import { designationOptions } from "@/data/designationOptions";
import { getSetupHints } from "@/data/setupHints";
import { pricingPlans } from "@/data/pricing";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

const initial = {
  companyName: "",
  businessType: "",
  firstName: "",
  lastName: "",
  designation: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

function countryNameFromPhone(e164) {
  if (!e164) return undefined;
  try {
    const p = parsePhoneNumber(e164);
    if (!p?.country) return undefined;
    return new Intl.DisplayNames(["en"], { type: "region" }).of(p.country);
  } catch {
    return undefined;
  }
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
    const configuredIsLocal =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "::1";

    if (configuredIsLocal && pageHost && pageHost !== "localhost") {
      url.hostname = pageHost;
      return url.toString().replace(/\/$/, "");
    }
  } catch {
    return configured;
  }

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
        if (data?.plans?.length) {
          setPlanOptions(plansToOptions(data.plans));
        } else {
          setPlanOptions(fallbackPlanOptions);
        }
      })
      .catch(() => {
        if (!cancelled) setPlanOptions(fallbackPlanOptions);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!planOptions.length) return;
    const fromUrl = initialPlanId && planOptions.some((p) => p.id === initialPlanId);
    if (fromUrl) {
      setSelectedPlanId(initialPlanId);
      return;
    }
    setSelectedPlanId((prev) => prev || planOptions[0].id);
  }, [planOptions, initialPlanId]);

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!selectedPlanId) next.selectedPlanId = "Please select a plan.";
    if (!values.companyName.trim()) next.companyName = "Company name is required.";
    if (!values.businessType) next.businessType = "Please select a business type.";
    if (!values.firstName.trim()) next.firstName = "First name is required.";
    if (!values.lastName.trim()) next.lastName = "Last name is required.";
    if (!values.designation) next.designation = "Please select a designation.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (!values.password) next.password = "Password is required.";
    else if (values.password.length < 8)
      next.password = "Use at least 8 characters.";
    if (values.password !== values.confirmPassword)
      next.confirmPassword = "Passwords do not match.";

    if (values.phone) {
      if (!isValidPhoneNumber(values.phone)) {
        next.phone =
          "Enter a complete number for the selected country (length is checked automatically), or leave blank.";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(false);
    setApiError("");
    if (!validate()) return;

    const baseUrl = getBrowserApiBase();
    if (!baseUrl) {
      setApiError("Registration is not configured (missing NEXT_PUBLIC_API_URL).");
      return;
    }

    const setupBlueprint = getSetupHints(values.businessType);
    const country = countryNameFromPhone(values.phone);
    const payload = {
      selectedPlan: selectedPlanId,
      setupBlueprint,
      companyName: values.companyName,
      businessType: values.businessType,
      firstName: values.firstName,
      lastName: values.lastName,
      designation: values.designation,
      email: values.email,
      password: values.password,
      phone: values.phone || null,
      country: country || null,
    };

    setSubmitting(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setApiError(data.message || `Registration failed (${res.status}).`);
        return;
      }
      setSubmitted(true);
    } catch {
      setApiError("Could not reach the server. Check your connection and try again.");
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-[var(--moifone-border)] bg-white px-3.5 py-2.5 text-sm text-[var(--moifone-ink)] shadow-sm transition-colors placeholder:text-[var(--moifone-muted)]/60 focus:border-[#c9a8b2] focus:outline-none focus:ring-2 focus:ring-[#7b1e3a]/15";

  const inputClassNoTop =
    "w-full rounded-xl border border-[var(--moifone-border)] bg-white px-3.5 py-2.5 text-sm text-[var(--moifone-ink)] shadow-sm transition-colors placeholder:text-[var(--moifone-muted)]/60 focus:border-[#c9a8b2] focus:outline-none focus:ring-2 focus:ring-[#7b1e3a]/15";

  const labelClass = "text-xs font-medium text-[var(--moifone-ink)]";

  const passwordToggleBtn =
    "absolute right-2 top-1/2 z-[1] -translate-y-1/2 rounded-md p-1 text-[var(--moifone-muted)] transition-colors hover:bg-[var(--moifone-bg)] hover:text-[var(--moifone-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7b1e3a]/25";
  const setupHints = getSetupHints(values.businessType);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
    >
      <div>
        <label htmlFor="selectedPlanId" className={labelClass}>
          Plan <span className="text-[var(--moifone-primary)]">*</span>
        </label>
        <select
          id="selectedPlanId"
          name="selectedPlanId"
          value={selectedPlanId}
          onChange={(e) => {
            setSelectedPlanId(e.target.value);
            setErrors((err) => ({ ...err, selectedPlanId: undefined }));
          }}
          className={inputClass}
        >
          {planOptions.length === 0 ? (
            <option value="">Loading plans…</option>
          ) : (
            planOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))
          )}
        </select>
        {errors.selectedPlanId && (
          <p className="mt-1.5 text-xs text-red-600/90">{errors.selectedPlanId}</p>
        )}
        <p className="mt-1.5 text-[11px] text-[var(--moifone-muted)]">
          Branch limits follow your plan. You can confirm details with our team after signup.
        </p>
      </div>

      <div>
        <label htmlFor="companyName" className={labelClass}>
          Company / business name <span className="text-[var(--moifone-primary)]">*</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          autoComplete="organization"
          value={values.companyName}
          onChange={(e) => setField("companyName", e.target.value)}
          className={inputClass}
          placeholder="Registered or trading name"
        />
        {errors.companyName && (
          <p className="mt-1.5 text-xs text-red-600/90">{errors.companyName}</p>
        )}
      </div>

      <div>
        <label htmlFor="businessType" className={labelClass}>
          Business type / software usage <span className="text-[var(--moifone-primary)]">*</span>
        </label>
        <select
          id="businessType"
          name="businessType"
          value={values.businessType}
          onChange={(e) => setField("businessType", e.target.value)}
          className={inputClass}
        >
          <option value="">Select type</option>
          {businessTypeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.businessType && (
          <p className="mt-1.5 text-xs text-red-600/90">{errors.businessType}</p>
        )}
      </div>

      <AnimatePresence initial={false}>
        {setupHints && values.businessType && (
          <motion.div
            key={values.businessType}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-[var(--moifone-border)] bg-[var(--moifone-bg)]/90 px-4 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--moifone-primary)]">
                Setup blueprint preview
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--moifone-muted)]">
                {setupHints.summary}{" "}
                <span className="text-[var(--moifone-ink)]/80">
                  (Used to prioritize configuration; future Moifone Assistant
                  suggestions will align with this structure.)
                </span>
              </p>
              <ul className="mt-3 space-y-1.5 border-t border-[var(--moifone-border)] pt-3">
                {setupHints.modules.map((m) => (
                  <li
                    key={m}
                    className="flex items-center gap-2 text-xs text-[var(--moifone-ink)]/85"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--moifone-primary)]/70" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name <span className="text-[var(--moifone-primary)]">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            className={inputClass}
          />
          {errors.firstName && (
            <p className="mt-1.5 text-xs text-red-600/90">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name <span className="text-[var(--moifone-primary)]">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            className={inputClass}
          />
          {errors.lastName && (
            <p className="mt-1.5 text-xs text-red-600/90">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="designation" className={labelClass}>
          Designation <span className="text-[var(--moifone-primary)]">*</span>
        </label>
        <select
          id="designation"
          name="designation"
          value={values.designation}
          onChange={(e) => setField("designation", e.target.value)}
          className={inputClass}
        >
          {designationOptions.map((o) => (
            <option key={o.value || "empty"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.designation && (
          <p className="mt-1.5 text-xs text-red-600/90">{errors.designation}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email address <span className="text-[var(--moifone-primary)]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          className={inputClass}
          placeholder="you@company.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600/90">{errors.email}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className={labelClass}>
            Password <span className="text-[var(--moifone-primary)]">*</span>
          </label>
          <div className="relative mt-1.5">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={values.password}
              onChange={(e) => setField("password", e.target.value)}
              className={`${inputClassNoTop} pr-10`}
            />
            <button
              type="button"
              className={passwordToggleBtn}
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" strokeWidth={2} aria-hidden />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600/90">{errors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm password <span className="text-[var(--moifone-primary)]">*</span>
          </label>
          <div className="relative mt-1.5">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={(e) => setField("confirmPassword", e.target.value)}
              className={`${inputClassNoTop} pr-10`}
            />
            <button
              type="button"
              className={passwordToggleBtn}
              onClick={() => setShowConfirmPassword((s) => !s)}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" strokeWidth={2} aria-hidden />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-600/90">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone number <span className="text-[var(--moifone-muted)]">(optional)</span>
        </label>
        <PhoneInput
          id="phone"
          international
          defaultCountry="IN"
          countryCallingCodeEditable={false}
          limitMaxLength
          value={values.phone || undefined}
          onChange={(v) => setField("phone", v || "")}
          className="moifone-phone w-full"
          numberInputProps={{
            id: "phone-national",
            name: "phone",
            autoComplete: "tel",
          }}
        />
        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-600/90">{errors.phone}</p>
        )}
      </div>

      {apiError && (
        <p className="rounded-xl border border-red-200/90 bg-red-50/90 px-4 py-3 text-sm text-red-900">
          {apiError}
        </p>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-900"
          >
            Your workspace is registered. You can sign in to the ERP back office
            with the email and password you provided.
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        className="w-full !py-3 text-sm"
        disabled={submitting || planOptions.length === 0}
      >
        {submitting ? "Submitting…" : "Complete registration"}
      </Button>
    </form>
  );
}
