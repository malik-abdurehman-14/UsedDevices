"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { CONSENT_KEY, track } from "@/lib/analytics";

const copy = {
  en: {
    text: "We use cookies to understand how visitors use our site. No analytics cookies are set unless you accept.",
    accept: "Accept",
    decline: "Decline",
    policy: "Privacy Policy",
  },
  ja: {
    text: "当サイトでは、利用状況の分析のためにCookieを使用します。同意いただくまで分析用Cookieは使用しません。",
    accept: "同意する",
    decline: "同意しない",
    policy: "プライバシーポリシー",
  },
};

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function Analytics({ gaId, lang }: { gaId?: string; lang: Locale }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());
    setReady(true);
  }, []);

  // Conversion tracking via event delegation: works for every WhatsApp / email / phone link on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = a.closest("header") ? "header" : a.closest("footer") ? "footer" : a.closest("section")?.id || "page";
      if (href.startsWith("https://wa.me")) track("whatsapp_click", { location, page: window.location.pathname });
      else if (href.startsWith("mailto:")) track("email_click", { location });
      else if (href.startsWith("tel:")) track("phone_click", { location });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Load GA4 only after consent is granted.
  useEffect(() => {
    if (consent !== "granted" || !gaId || document.getElementById("ga4-src")) return;
    const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // GA expects the `arguments` object itself
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", gaId, { anonymize_ip: true });
    const s = document.createElement("script");
    s.id = "ga4-src";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
  }, [consent, gaId]);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* storage unavailable — choice applies to this visit only */
    }
    setConsent(value);
  }

  if (!gaId) return null;
  const t = copy[lang];

  return (
    <>
      <AnimatePresence>
        {ready && consent === null && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 left-5 right-24 z-[45] max-w-md rounded-2xl border border-white/10 bg-ink-2/95 p-5 text-ivory shadow-2xl shadow-black/40 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-auto"
          >
            <p className="text-[13.5px] leading-relaxed text-ivory/80">
              {t.text}{" "}
              <Link href={`/${lang}/privacy`} className="underline decoration-gold/60 underline-offset-2 hover:text-ivory">
                {t.policy}
              </Link>
            </p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => choose("granted")} className="rounded-full bg-gold px-5 py-2 text-[13px] font-semibold text-ink transition hover:bg-gold-soft">
                {t.accept}
              </button>
              <button onClick={() => choose("denied")} className="rounded-full border border-white/15 px-5 py-2 text-[13px] font-semibold text-ivory/80 transition hover:border-white/40">
                {t.decline}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
