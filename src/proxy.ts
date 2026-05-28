import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { SITE_AUTH, verifyAuthToken } from "./lib/site-auth";

const intlMiddleware = createMiddleware(routing);

function nonDefaultLocalePrefix(pathname: string): string {
  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue;
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return `/${locale}`;
    }
  }
  return "";
}

function isUnlockPath(pathname: string): boolean {
  if (pathname === "/unlock") return true;
  for (const locale of routing.locales) {
    if (pathname === `/${locale}/unlock`) return true;
  }
  return false;
}

export default async function proxy(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // Gate disabled when SITE_PASSWORD is unset — site is open.
  if (!password) return intlMiddleware(req);

  const { pathname } = req.nextUrl;

  // Always let the unlock route through (page + its server action POSTs).
  if (isUnlockPath(pathname)) return intlMiddleware(req);

  const token = req.cookies.get(SITE_AUTH.cookieName)?.value;
  const secret = process.env.SITE_AUTH_SECRET || password;
  const ok = await verifyAuthToken(token, secret);
  if (ok) return intlMiddleware(req);

  // Redirect (not rewrite) so the URL becomes /unlock — keeps the unlock
  // form's server-action POST on a path the proxy allows through.
  const from = pathname + (req.nextUrl.search || "");
  const url = req.nextUrl.clone();
  url.pathname = `${nonDefaultLocalePrefix(pathname)}/unlock`;
  url.search = `?from=${encodeURIComponent(from)}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Match all pathnames except API routes, Next internals, and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
