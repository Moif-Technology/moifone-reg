import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-[var(--moifone-primary)] text-white shadow-sm shadow-[#7b1e3a]/15 hover:bg-[#651832] hover:shadow-md hover:shadow-[#7b1e3a]/20 focus-visible:outline-[var(--moifone-primary)] active:scale-[0.98]",
  secondary:
    "border border-[var(--moifone-border-strong)] bg-white/80 text-[var(--moifone-ink)] backdrop-blur-sm hover:border-[#e0d4d8] hover:bg-white focus-visible:outline-[var(--moifone-primary)] active:scale-[0.98]",
  ghost:
    "text-[var(--moifone-muted)] hover:bg-[var(--moifone-rose-mist)] hover:text-[var(--moifone-ink)] focus-visible:outline-[var(--moifone-primary)]",
  nav:
    "rounded-lg px-3 py-2 text-sm font-medium text-[var(--moifone-muted)] hover:text-[var(--moifone-ink)]",
};

export function Button({
  variant = "primary",
  className = "",
  href,
  type = "button",
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  );
}
