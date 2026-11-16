"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { Dictionary, InquiryIntent } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { site, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";

type Props = {
  lang: Locale;
  dict: Dictionary["inquiry"];
  whatsappMessage: Dictionary["whatsappMessage"];
  initialIntent?: InquiryIntent;
  initialCategory?: number;
  layoutKey?: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function InquiryForm({ lang, dict, whatsappMessage, initialIntent, initialCategory = 2, layoutKey = "form" }: Props) {
  const [intent, setIntent] = useState<InquiryIntent>(initialIntent ?? dict.defaultIntent);
  const [category, setCategory] = useState(initialCategory);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function read(form: HTMLFormElement) {
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    return {
      name: get("name"),
      company: get("company"),
      country: get("country"),
      email: get("email"),
      phone: get("phone"),
      quantity: get("quantity"),
      message: get("message"),
      website: get("website"),
      category: dict.fields.categories[category],
      intent,
      locale: lang,
    };
  }

  function validate(data: ReturnType<typeof read>) {
    if (!data.name || (!data.email && !data.phone)) {
      setError(dict.required);
      return false;
    }
    setError(null);
    return true;
  }

  function summary(data: ReturnType<typeof read>) {
    const f = dict.fields;
    return [
      whatsappMessage[intent],
      "",
      `${dict.intentLabel}: ${dict.intents[intent]}`,
      `${f.name}: ${data.name}`,
      data.company && `${f.company}: ${data.company}`,
      data.country && `${f.country}: ${data.country}`,
      data.email && `${f.email}: ${data.email}`,
      data.phone && `${f.phone}: ${data.phone}`,
      `${f.category}: ${data.category}`,
      data.quantity && `${f.quantity}: ${data.quantity}`,
      data.message && `${f.message}: ${data.message}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = read(e.currentTarget);
    if (!validate(data)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        track("generate_lead", { method: "form", intent, locale: lang });
        setStatus("success");
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (json.error === "not_configured") {
        // Email service not set up yet → open the visitor's mail app instead.
        const subject = `${dict.title} — ${dict.intents[intent]}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary(data))}`;
        setStatus("idle");
        return;
      }
      setStatus("error");
      setError(dict.errorSend);
    } catch {
      setStatus("error");
      setError(dict.errorSend);
    }
  }

  function onWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const data = read(e.currentTarget.form!);
    if (!validate(data)) return;
    track("generate_lead", { method: "whatsapp_form", intent, locale: lang });
    window.open(whatsappLink(summary(data)), "_blank", "noopener,noreferrer");
  }

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-ivory placeholder:text-mist/60 outline-none transition focus:border-gold/60 focus:bg-white/[0.06]";
  const label = "mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-mist";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center py-12 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15"
          >
            <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={1.5} />
          </motion.span>
          <h3 className="font-display mt-6 text-3xl text-ivory">{dict.successTitle}</h3>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-mist">{dict.successDesc}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-ivory transition hover:border-gold/60"
          >
            {dict.sendAnother}
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5" onSubmit={onSubmit} noValidate>
          {/* honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div>
            <span className={label}>{dict.intentLabel}</span>
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 p-1">
              {(Object.keys(dict.intents) as InquiryIntent[]).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setIntent(key)}
                  aria-pressed={intent === key}
                  className={`relative rounded-xl px-4 py-2.5 text-sm font-medium transition ${intent === key ? "text-ink" : "text-mist hover:text-ivory"}`}
                >
                  {intent === key && (
                    <motion.span
                      layoutId={`${layoutKey}-intent`}
                      className="absolute inset-0 rounded-xl bg-gold"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{dict.intents[key]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={label}>{dict.fields.name} *</span>
              <input name="name" className={input} autoComplete="name" required />
            </label>
            <label>
              <span className={label}>{dict.fields.company}</span>
              <input name="company" className={input} autoComplete="organization" />
            </label>
            <label>
              <span className={label}>{dict.fields.email}</span>
              <input name="email" type="email" className={input} autoComplete="email" />
            </label>
            <label>
              <span className={label}>{dict.fields.phone}</span>
              <input name="phone" type="tel" className={input} autoComplete="tel" />
            </label>
            <label>
              <span className={label}>{dict.fields.country}</span>
              <input name="country" className={input} autoComplete={lang === "ja" ? "address-level1" : "country-name"} />
            </label>
            <label>
              <span className={label}>{dict.fields.quantity}</span>
              <input name="quantity" className={input} />
            </label>
          </div>

          <div>
            <span className={label}>{dict.fields.category}</span>
            <div className="flex flex-wrap gap-2">
              {dict.fields.categories.map((c, i) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategory(i)}
                  aria-pressed={category === i}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    category === i ? "border-gold bg-gold/15 text-gold-soft" : "border-white/10 text-mist hover:border-white/30 hover:text-ivory"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className={label}>{dict.fields.message}</span>
            <textarea name="message" rows={4} className={`${input} resize-none`} placeholder={dict.fields.messagePlaceholder} />
          </label>

          {error && <p className="text-sm text-red-300" role="alert">{error}</p>}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-soft disabled:opacity-70"
            >
              {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {status === "sending" ? dict.sending : dict.sendEmail}
            </button>
            <button
              type="button"
              onClick={onWhatsApp}
              className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-ivory transition hover:border-[#25D366]/70"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              {dict.sendWhatsapp}
            </button>
          </div>
          <p className="text-center text-xs text-mist/80">{dict.note}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
