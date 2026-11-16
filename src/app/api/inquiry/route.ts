import { site } from "@/config/site";

/**
 * Inquiry endpoint — emails each submission to the business via Resend (https://resend.com).
 *
 * Required environment variables:
 *   RESEND_API_KEY       API key from Resend
 *   INQUIRY_TO_EMAIL     where inquiries are delivered (defaults to site.email)
 *   INQUIRY_FROM_EMAIL   verified sender, e.g. "Website <inquiry@yourdomain.com>"
 *
 * If RESEND_API_KEY is missing the endpoint answers 503 and the browser falls back to mailto:.
 */

const LIMITS = { name: 120, company: 160, country: 80, email: 200, phone: 60, quantity: 60, message: 4000, category: 60 };
type Field = keyof typeof LIMITS;

// Basic in-memory rate limit (per server instance): 5 submissions / 10 minutes / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const data = {} as Record<Field, string>;
  for (const key of Object.keys(LIMITS) as Field[]) {
    const raw = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    data[key] = raw.slice(0, LIMITS[key]);
  }
  const intent = body.intent === "sell" ? "sell" : "buy";
  const locale = body.locale === "ja" ? "ja" : "en";

  if (!data.name || (!data.email && !data.phone)) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const label = intent === "sell" ? "SELL (買取査定)" : "BUY (Wholesale)";
  const subject = `[${label}] ${data.name}${data.company ? ` — ${data.company}` : ""}${data.country ? ` (${data.country})` : ""}`;
  const rows: [string, string][] = [
    ["Type", label],
    ["Site language", locale.toUpperCase()],
    ["Name", data.name],
    ["Company", data.company],
    ["Country / Region", data.country],
    ["Email", data.email],
    ["WhatsApp / Phone", data.phone],
    ["Category", data.category],
    ["Quantity", data.quantity],
    ["Message", data.message],
  ].filter(([, v]) => v) as [string, string][];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#666;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.INQUIRY_TO_EMAIL ?? site.email],
      reply_to: data.email || undefined,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
