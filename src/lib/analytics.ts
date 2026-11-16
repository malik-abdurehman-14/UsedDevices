type Gtag = (...args: unknown[]) => void;

/** Send a GA4 event if analytics is loaded (i.e. the visitor accepted cookies). */
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", event, params);
}

export const CONSENT_KEY = "analytics-consent";
