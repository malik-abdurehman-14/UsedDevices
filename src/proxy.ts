import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { defaultLocale, locales } from "@/i18n/config";
import { brands } from "@/content/brands";
import { postSlugs } from "@/content/insights/slugs";

const brandSlugs = new Set(brands.map((b) => b.slug));

function getLocale(request: NextRequest) {
  const headers = { "accept-language": request.headers.get("accept-language") ?? "" };
  try {
    const languages = new Negotiator({ headers }).languages();
    return match(languages, [...locales], defaultLocale);
  } catch {
    return defaultLocale;
  }
}

/** Redirect locale-less URLs to /en or /ja based on the visitor's browser language. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) {
    // Unknown brand slugs → real 404 (status code), handled by the [...rest] catch-all.
    const m = pathname.match(/^\/(en|ja)\/brands\/([^/]+)\/?$/);
    if (m && !brandSlugs.has(m[2])) {
      return NextResponse.rewrite(new URL(`/${m[1]}/not-found`, request.url));
    }
    // Unknown article slugs → real 404
    const a = pathname.match(/^\/(en|ja)\/insights\/([^/]+)\/?$/);
    if (a && !(postSlugs[a[1] as "en" | "ja"] as readonly string[]).includes(a[2])) {
      return NextResponse.rewrite(new URL(`/${a[1]}/not-found`, request.url));
    }
    return;
  }

  request.nextUrl.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (sitemap.xml, robots.txt, images…)
  matcher: ["/((?!_next|api|apple-icon|icon|opengraph-image|.*\\..*).*)"],
};
