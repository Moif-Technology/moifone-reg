import Link from "next/link";

export function BrandMark({ href = "/", className = "" }) {
  const inner = (
    <span
      className={`font-semibold tracking-tight text-[var(--moifone-ink)] ${className}`}
    >
      <span className="bg-gradient-to-r from-[#7b1e3a] to-[#9a2d4a] bg-clip-text text-transparent">
        Moi
      </span>
      <span className="text-[var(--moifone-ink)]">fone</span>
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
