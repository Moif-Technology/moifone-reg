import Link from "next/link";

export function BrandMark({ href = "/", className = "", variant = "default" }) {
  const inner = (
    <span className={`font-semibold tracking-tight ${className}`}>
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: variant === "light"
            ? "linear-gradient(to right, #e8384f, #c0202e)"
            : "linear-gradient(to right, #7b1e3a, #9a2d4a)",
        }}
      >
        Moi
      </span>
      <span className={variant === "light" ? "text-white" : "text-[var(--moifone-ink)]"}>
        fone
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="group inline-flex items-center gap-1">
        {inner}
      </Link>
    );
  }

  return inner;
}
