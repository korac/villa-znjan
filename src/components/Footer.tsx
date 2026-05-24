import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { site } from "@/content/site";

const navItems = [
  { key: "apartments", href: "/#apartments" },
  { key: "gallery", href: "/#gallery" },
  { key: "location", href: "/#location" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div className="space-y-4">
          <p className="font-serif text-2xl tracking-wide">
            Villa <span className="text-accent">Žnjan</span>
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            {t("footer.tagline")}
          </p>
          <p className="eyebrow pt-2">{t("footer.builtNote")}</p>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <h4 className="eyebrow">{t("footer.quickLinks")}</h4>
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="eyebrow">{t("footer.contactHeading")}</h4>
          <address className="space-y-3 text-sm not-italic text-muted">
            <p className="leading-relaxed">{t("footer.address")}</p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${site.phoneHref}`}
                className="transition-colors hover:text-foreground"
              >
                {site.phone}
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex h-16 items-center justify-between text-xs text-muted">
          <span>
            © {year} {site.name}. {t("footer.rights")}
          </span>
        </Container>
      </div>
    </footer>
  );
}
