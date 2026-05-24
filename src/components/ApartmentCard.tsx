import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/Photo";
import type { Apartment } from "@/content/apartments";
import type { Locale } from "@/i18n/routing";

export function ApartmentCard({
  apartment,
  index = 0,
}: {
  apartment: Apartment;
  index?: number;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const copy = apartment.content[locale];

  return (
    <Link href={`/apartments/${apartment.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          src={apartment.images[0]}
          alt={copy.name}
          index={index}
          label={copy.name}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
      </div>

      <div className="pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl text-foreground">{copy.name}</h3>
          <span className="whitespace-nowrap text-sm text-muted">
            {t("apartment.from")}{" "}
            <span className="text-foreground">€{apartment.basePriceEur}</span>
            {t("apartment.perNight")}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">{copy.tagline}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">
          {t("apartment.guests", { count: apartment.maxGuests })}
          <span className="mx-2 text-border">·</span>
          {t("apartment.bedrooms", { count: apartment.bedrooms })}
          <span className="mx-2 text-border">·</span>
          {t("apartment.size", { size: apartment.sizeM2 })}
        </p>
        <span className="mt-4 inline-block border-b border-accent pb-0.5 text-xs uppercase tracking-[0.18em] text-accent transition-colors group-hover:border-accent-hover group-hover:text-accent-hover">
          {t("home.units.viewDetails")}
        </span>
      </div>
    </Link>
  );
}
