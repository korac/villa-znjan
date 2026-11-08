"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { buttonClasses } from "@/components/Button";
import { cn } from "@/lib/cn";

const navItems = [
  { key: "apartments", href: "/#apartments" },
  { key: "villa", href: "/villa" },
  { key: "gallery", href: "/#gallery" },
  { key: "location", href: "/#location" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <Container className="flex h-20 items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-foreground"
          onClick={() => setOpen(false)}
        >
          Villa <span className="text-accent">Žnjan</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitcher />
          <Link href="/#apartments" className={buttonClasses("primary")}>
            {t("bookNow")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-transform",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-transform",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </Container>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-6 py-8">
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.18em] text-foreground"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-border pt-6">
              <LocaleSwitcher />
              <Link
                href="/#apartments"
                onClick={() => setOpen(false)}
                className={buttonClasses("primary")}
              >
                {t("bookNow")}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
