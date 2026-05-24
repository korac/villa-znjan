"use client";

import { useLocale } from "next-intl";
import { Fragment } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
    >
      {routing.locales.map((locale, i) => (
        <Fragment key={locale}>
          {i > 0 && <span className="text-border">/</span>}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === active ? "true" : undefined}
            className={cn(
              "transition-colors",
              locale === active
                ? "text-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {locale}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
