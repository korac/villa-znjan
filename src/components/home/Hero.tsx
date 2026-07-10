import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/Photo";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* Background photo (stone placeholder until a real hero image is added) */}
      <Photo
        src="/hero4.jpg"
        alt={t("title")}
        index={0}
        priority
        label="Villa Žnjan"
        sizes="100vw"
      />
      {/* Scrim for legibility, weighted to the left where the text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/45 to-foreground/15" />

      <Container className="relative">
        <div className="max-w-2xl py-24 text-background">
          <p className="text-xs uppercase tracking-[0.3em] text-background/80">
            {t("eyebrow")}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/90">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/#apartments" className={buttonClasses("primary")}>
              {t("cta")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-background/50 px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-background hover:text-foreground"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
