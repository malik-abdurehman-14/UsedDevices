import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { brands } from "@/content/brands";
import { absoluteUrl } from "@/lib/seo";
import { posts } from "@/content/insights";
import { postSlugs } from "@/content/insights/slugs";

// Fail the build if the proxy's slug list drifts from the real articles.
for (const l of locales) {
  const real = posts[l].map((p) => p.slug).sort().join();
  const listed = [...postSlugs[l]].sort().join();
  if (real !== listed) throw new Error(`src/content/insights/slugs.ts is out of sync for "${l}"`);
}

const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/laptops", priority: 0.9 },
  { path: "/smartphones", priority: 0.9 },
  { path: "/sell", priority: 0.9 },
  { path: "/about", priority: 0.9 },
  { path: "/contact", priority: 0.7 },
  { path: "/insights", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
  ...brands.map((b) => ({ path: `/brands/${b.slug}`, priority: 0.8 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = locales.flatMap((lang) =>
    posts[lang].map((p) => ({
      url: absoluteUrl(`/${lang}/insights/${p.slug}`),
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );
  return [...articles, ...pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: absoluteUrl(`/${lang}${path}`),
      changeFrequency: "weekly" as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(`/${l}${path}`)])),
          "x-default": absoluteUrl(`/en${path}`),
        },
      },
    })),
  )];
}
