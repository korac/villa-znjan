import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Photo } from "@/components/Photo";
import { ApartmentCard } from "@/components/ApartmentCard";
import { Hero } from "@/components/home/Hero";
import { GallerySection } from "@/components/home/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { getApartmentsOrdered } from "@/content/apartments";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const apartments = getApartmentsOrdered();

  return (
    <main>
      <Hero />

      {/* Intro */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              {t("intro.heading")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {t("intro.body")}
            </p>
          </div>
        </Container>
      </section>

      {/* Apartments */}
      <section id="apartments" className="scroll-mt-24 border-t border-border py-24">
        <Container>
          <SectionHeading
            eyebrow={t("hero.eyebrow")}
            title={t("units.heading")}
            subtitle={t("units.subheading")}
          />
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {apartments.map((apartment, i) => (
              <ApartmentCard
                key={apartment.slug}
                apartment={apartment}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Location */}
      <section id="location" className="scroll-mt-24 bg-surface py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title={t("location.heading")}
                subtitle={t("location.body")}
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo
                src={undefined}
                alt={t("location.heading")}
                index={2}
                label="Žnjan, Split"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <GallerySection />

      {/* Contact — sits directly before the footer */}
      <ContactSection className="border-t border-border py-24" />
    </main>
  );
}
