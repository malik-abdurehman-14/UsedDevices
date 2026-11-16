# Launch checklist

## 1. Replace placeholders
- `src/config/site.ts` — business name, WhatsApp, email, phone, address, 古物商許可番号, company profile
- `src/i18n/dictionaries/*.ts` — stats (50,000+ devices, 40+ countries …) and any claims
- `src/content/pages/privacy.ts` — have the privacy policy reviewed
- If the Japanese share-image text changes, regenerate `assets/fonts/NotoSerifJP-subset.woff` (see README)

## 2. Deploy to Vercel (recommended)
1. Push this repository to GitHub (private repo is fine).
2. vercel.com → **Add New → Project** → import the repo. Framework is detected automatically.
3. Add environment variables (Settings → Environment Variables):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.your-domain.com` |
| `RESEND_API_KEY` | from resend.com |
| `INQUIRY_TO_EMAIL` | where inquiries arrive |
| `INQUIRY_FROM_EMAIL` | `Website <inquiry@your-domain.com>` (domain verified in Resend) |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXX` from Google Analytics 4 |
| `GOOGLE_SITE_VERIFICATION` | code from Search Console (HTML tag method) |

4. Deploy, then **Settings → Domains** → add the domain and follow the DNS instructions.

> Any Node.js host works too: `npm ci && npm run build && npm start` (Node 20+).

## 3. Email (Resend)
1. resend.com → add and verify your domain (DNS records).
2. Create an API key → `RESEND_API_KEY`.
3. Submit the contact form on the live site and confirm the email arrives.

## 4. Google Search Console
1. search.google.com/search-console → add property `https://www.your-domain.com`.
2. Choose **HTML tag**, copy the `content` value into `GOOGLE_SITE_VERIFICATION`, redeploy, click Verify.
3. Sitemaps → submit `sitemap.xml`.
4. Optional: Bing Webmaster Tools → `BING_SITE_VERIFICATION`.

## 5. Google Analytics 4
1. analytics.google.com → create a GA4 property and a Web data stream → copy the Measurement ID.
2. Set `NEXT_PUBLIC_GA_ID` and redeploy. GA loads only after a visitor accepts the cookie banner.
3. In GA → Admin → Events, mark these as **key events** (conversions):
   - `generate_lead` (form or WhatsApp form sent)
   - `whatsapp_click`
   - `email_click`, `phone_click`
   - `inquiry_open` is useful for funnel analysis.

## 6. After launch
- Google Business Profile for the Japan office (helps 「パソコン 買取 + 地域名」 searches).
- Add one new article per month in `src/content/insights/` (and its slug in `slugs.ts` — the build fails if they drift).
- Replace device illustrations with real photos when available.
