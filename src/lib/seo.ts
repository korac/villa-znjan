import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

/**
 * The one public address of the site. www.villaznjan.com redirects here
 * (configured in Vercel), so every canonical URL, sitemap entry and
 * language alternate points at this host.
 */
export const SITE_URL = "https://villaznjan.com";

/**
 * True only on the production deployment (villaznjan.com). Everywhere else -
 * beta.villaznjan.com (the develop branch), Vercel previews, local builds -
 * the site tells search engines not to index it, so beta never competes
 * with the real site in Google.
 */
export const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

/** Default social share image, 1200x630 (public/og-image.jpg). */
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

const OG_LOCALES: Record<Locale, string> = {
  en: "en_GB",
  hr: "hr_HR",
  de: "de_DE",
};

/**
 * URL path of a page in a locale. Routing is "as-needed": English (the
 * default) has no prefix, Croatian and German live under /hr and /de.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === routing.defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function absoluteUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/** Every language version of a page, plus x-default for everyone else. */
export function languageAlternates(path: string, absolute = false) {
  const url = absolute ? absoluteUrl : localePath;
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, url(l, path)])),
    "x-default": url(routing.defaultLocale, path),
  };
}

/**
 * Page metadata with a canonical URL, language alternates (hreflang) and
 * social share previews. Relative URLs resolve against metadataBase, set
 * in the locale layout.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: "Villa Žnjan",
      url: localePath(locale, path),
      title,
      description,
      locale: OG_LOCALES[locale],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
