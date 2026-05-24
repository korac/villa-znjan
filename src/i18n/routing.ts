import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // English for international guests, Croatian (local), German (large coastal segment)
  locales: ["en", "hr", "de"],
  defaultLocale: "en",
  // Default locale served at "/", others prefixed: "/hr", "/de"
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
