# Used Devices — Used Laptops & Smartphones (Japan → World)

Bilingual (English / 日本語) marketing site built with **Next.js 16 (App Router)**, Tailwind CSS v4, Motion and Lenis.

- **/en** — international wholesale buyers (buy in bulk)
- **/ja** — sellers in Japan (買取 / sell to us)
- `/` auto-redirects by browser language (`src/proxy.ts`)

No prices are shown anywhere; every call to action opens WhatsApp or the inquiry form.

## Run
```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Before launch — edit these
| What | Where |
|---|---|
| Business name, WhatsApp number, email, phone, address, 古物商許可番号 | `src/config/site.ts` |
| Live domain (for SEO canonical / sitemap) | env `NEXT_PUBLIC_SITE_URL` |
| All English copy (incl. stats like "50,000+ devices") | `src/i18n/dictionaries/en.ts` |
| All Japanese copy | `src/i18n/dictionaries/ja.ts` |
| Brand lists in the marquee | `src/components/home/StatsBrands.tsx` |
| Company profile (founded, representative) | `src/config/site.ts` → `company` |
| Email delivery | `.env.local` (see below) |

## Inquiry emails
Form submissions go to `POST /api/inquiry`, which emails the client through [Resend](https://resend.com).
1. Create a Resend account, verify the sending domain, create an API key.
2. Copy `.env.example` to `.env.local` (or set the same variables on your host) and fill in
   `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`.

Until a key is set, the form falls back to opening the visitor's email app; WhatsApp sending always works.

## Pages
| Path (`/en` and `/ja`) | EN audience | JA audience |
|---|---|---|
| `/` | Bulk buyers | Sellers (買取) |
| `/laptops`, `/smartphones` | Wholesale stock | 買取対象 |
| `/brands/[brand]` (19 brands) | Wholesale by brand | メーカー別買取 |
| `/sell` | Selling in Japan (English) | 買取について |
| `/about` | About + wholesale (merged; `/wholesale` redirects here) | 会社概要 |
| `/contact` | Form + methods | 査定フォーム |

Brand data (series lists, blurbs) lives in `src/content/brands.ts`; page copy in `src/content/pages/`.

## Insights (blog)
Articles live in `src/content/insights/posts-en.ts` and `posts-ja.ts` as structured blocks (`p`, `h2`, `ul`, `ol`, `note`).
When adding an article, also add its slug to `src/content/insights/slugs.ts` (the build fails if they differ).

## Social share images
`src/app/[lang]/opengraph-image.tsx` renders the preview image. The Japanese font is a small subset
(`assets/fonts/NotoSerifJP-subset.woff`) containing only the characters used. If you change the Japanese text,
re-download the subset from Google Fonts with `&text=<new characters>`.

## Analytics events
`whatsapp_click`, `email_click`, `phone_click`, `inquiry_open`, `generate_lead` — sent only after cookie consent.

## Structure
```
src/
  app/[lang]/        layout (SEO metadata, hreflang), home page, 404
  app/sitemap.ts     multilingual sitemap
  app/robots.ts
  components/home/   landing-page sections
  components/layout/ header, footer, inquiry modal, WhatsApp button, smooth scroll
  components/ui/     motion primitives, buttons
  i18n/              locale config + dictionaries
  lib/seo.ts         JSON-LD (Organization, WebSite, FAQPage)
```

## Roadmap
- **Phase 1 (done)** — design system, bilingual routing, full landing page, inquiry/WhatsApp flow, technical SEO.
- **Phase 2 (done)** — inner pages: Laptops, Smartphones, 15 brand pages, Wholesale, 買取 (Sell), About, Contact; brands mega-menu; form submission by email (Resend); breadcrumbs + per-page SEO.
- **Phase 3 (done)** — Insights blog (3 EN buyer guides, 3 JA seller guides), GA4 with cookie consent + conversion events, Search Console/Bing verification, social share images, privacy policy, security headers, manifest/apple icon, error page, performance pass (Lighthouse 93–100 on all four categories). Deployment steps: see `DEPLOY.md`.

## Device photos

Product photos live in `src/assets/devices/*.webp` and are registered in `src/content/photos.ts`
(each brand picks its photos via `photos: [...]` in `src/content/brands.ts`).
They are free-licensed images from Wikimedia Commons (CC0 / CC BY / CC BY-SA) — **attribution is required**
and is shown on `/en/credits` and `/ja/credits` (linked in the footer). When you swap in the client's own
photos, add them to `photos.ts` and delete the old entry so the credits page stays accurate.
