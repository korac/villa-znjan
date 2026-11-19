import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { apartments } from "@/content/apartments";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

/** Every public page in every language, with its language alternates. */
const PATHS = [
  "/",
  "/villa",
  "/contact",
  "/privacy",
  ...apartments.map((a) => `/apartments/${a.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      alternates: { languages: languageAlternates(path, true) },
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
  );
}
