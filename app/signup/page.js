import { Suspense } from "react";
import { SignupContent } from "@/components/signup/SignupContent";

function SignupFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--moifone-bg)]">
      <div className="rounded-2xl border border-[var(--moifone-border)] bg-white px-8 py-6 text-sm text-[var(--moifone-muted)] shadow-sm">
        Loading registration…
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFallback />}>
      <SignupContent />
    </Suspense>
  );
}
