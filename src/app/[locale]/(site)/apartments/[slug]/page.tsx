import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { Gallery } from "@/components/Gallery";
import { buttonClasses } from "@/components/Button";
import { routing, type Locale } from "@/i18n/routing";
import { apartments, getApartment } from "@/content/apartments";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    apartments.map((apartment) => ({ locale, slug: apartment.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const apartment = getApartment(slug);
  if (!apartment) return {};
  const copy = apartment.content[locale];
  return {
    title: `${copy.name} — Villa Žnjan`,
    description: copy.description,
  };
}

export default async function ApartmentPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const apartment = getApartment(slug);
  if (!apartment) notFound();

  const t = await getTranslations();
  const copy = apartment.content[locale];

  const specs = [
    t("apartment.guests", { count: apartment.maxGuests }),
    t("apartment.bedrooms", { count: apartment.bedrooms }),
    t("apartment.bathrooms", { count: apartment.bathrooms }),
    t("apartment.size", { size: apartment.sizeM2 }),
  ];

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <Link
          href="/#apartments"
          className="text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
        >
          ← {t("apartment.backToAll")}
        </Link>

        {/* Title */}
        <div className="mt-8 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
            {copy.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{copy.tagline}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.15em] text-muted">
            {specs.map((spec, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-2 text-border">·</span>}
                {spec}
              </span>
            ))}
          </p>
        </div>
      </Container>

      {/* Gallery */}
      <Container className="mt-10">
        <Gallery
          images={apartment.images}
          name={copy.name}
          layout="hero"
          offset={apartment.order}
          priority
        />
      </Container>

      {/* Detail + booking */}
      <Container className="mt-16">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Description + amenities */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl">
              {t("apartment.overviewHeading")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {copy.description}
            </p>

            <h2 className="mt-14 font-serif text-3xl">
              {t("apartment.amenitiesHeading")}
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {apartment.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-3 text-sm">
                  <span className="text-accent" aria-hidden>
                    —
                  </span>
                  <span>{t(`amenities.${amenity}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking card */}
          <aside className="lg:col-span-1">
            <div className="border border-border bg-surface p-8 lg:sticky lg:top-28">
              <p className="text-sm text-muted">
                {t("apartment.from")}
              </p>
              {/*<p className="mt-1 font-serif text-4xl">*/}
              {/*  €{apartment.basePriceEur}*/}
              {/*  <span className="ml-1 text-base text-muted">*/}
              {/*    {t("apartment.perNight")}*/}
              {/*  </span>*/}
              {/*</p>*/}
              <Link
                href="/contact"
                className={buttonClasses("primary", "mt-6 w-full")}
              >
                {t("apartment.bookNow")}
              </Link>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                {t("apartment.bookingComingSoon")}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
