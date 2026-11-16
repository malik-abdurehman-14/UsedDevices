"use client";

import { CONSENT_KEY } from "@/lib/analytics";

/** Lets visitors change their analytics choice: clears it and reloads so the banner re-appears. */
export function CookieSettings({ label }: { label: string }) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return null;
  return (
    <button
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_KEY);
        } catch {}
        window.location.reload();
      }}
      className="underline-offset-2 transition hover:text-ivory hover:underline"
    >
      {label}
    </button>
  );
}
