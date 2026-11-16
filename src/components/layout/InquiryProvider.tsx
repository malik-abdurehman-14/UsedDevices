"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Dictionary, InquiryIntent } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { lockScroll } from "@/lib/lenis";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { track } from "@/lib/analytics";

type Ctx = { open: (intent?: InquiryIntent, category?: number) => void };
const InquiryContext = createContext<Ctx | null>(null);

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used inside InquiryProvider");
  return ctx;
}

type Props = {
  lang: Locale;
  dict: Dictionary["inquiry"];
  whatsappMessage: Dictionary["whatsappMessage"];
  children: ReactNode;
};

export function InquiryProvider({ lang, dict, whatsappMessage, children }: Props) {
  const [state, setState] = useState<{ open: boolean; intent?: InquiryIntent; category?: number; key: number }>({ open: false, key: 0 });

  const open = useCallback((intent?: InquiryIntent, category?: number) => {
    track("inquiry_open", { intent, page: window.location.pathname });
    setState((s) => ({ open: true, intent, category, key: s.key + 1 }));
  }, []);
  const close = () => setState((s) => ({ ...s, open: false }));

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setState((s) => ({ ...s, open: false }));
    lockScroll(true);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [state.open]);

  return (
    <InquiryContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
          >
            <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={close} />
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-ink-2 p-6 text-ivory shadow-2xl shadow-black/60 sm:rounded-3xl sm:p-10"
              data-lenis-prevent
            >
              <div className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
              <button
                onClick={close}
                className="absolute right-5 top-5 z-10 rounded-full border border-white/10 p-2 text-mist transition hover:border-gold/50 hover:text-gold"
                aria-label={dict.close}
              >
                <X className="h-4 w-4" />
              </button>
              <h2 id="inquiry-title" className="font-display relative text-3xl sm:text-4xl">
                {dict.title}
              </h2>
              <p className="relative mt-2 text-sm text-mist">{dict.subtitle}</p>
              <div className="relative mt-8">
                <InquiryForm
                  key={state.key}
                  lang={lang}
                  dict={dict}
                  whatsappMessage={whatsappMessage}
                  initialIntent={state.intent}
                  initialCategory={state.category}
                  layoutKey="modal"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </InquiryContext.Provider>
  );
}
