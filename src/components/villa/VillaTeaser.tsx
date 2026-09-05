import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Photo } from "@/components/Photo";
import { getVillaSectionsOrdered } from "@/content/villa";
import type { Locale } from "@/i18n/routing";

/**
 * Homepage row of three cards (pool / breakfast / gym & sauna) linking through
 * to the matching band on `/villa`.
 */
export function VillaTeaser() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.villa");
  const sections = getVillaSectionsOrdered();

  return (
    <section id="villa" className="scroll-mt-24 border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          subtitle={t("subheading")}
          align="center"
        />

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-3">
          {sections.map((section, i) => {
            const copy = section.content[locale];
            return (
              <Link
                key={section.key}
                href={`/villa#${section.key}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo
                    src={section.images[0]}
                    alt={copy.title}
                    index={i + 1}
                    label={copy.label}
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/25" />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold transition-colors group-hover:text-highlight">
                  {copy.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted transition-colors group-hover:text-highlight">
                  {copy.teaser}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/villa"
            className="inline-block border-b border-accent pb-0.5 text-xs uppercase tracking-[0.18em] text-accent transition-colors hover:border-accent-hover hover:text-accent-hover"
          >
            {t("cta")} →
          </Link>
        </div>
      </Container>
    </section>
  );
}
