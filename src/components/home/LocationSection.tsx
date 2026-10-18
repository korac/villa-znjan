import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonClasses } from "@/components/Button";
import { destinations } from "@/content/location";
import { site } from "@/content/site";
import { embedUrl, placeUrl } from "@/lib/googleMaps";
import type { Locale } from "@/i18n/routing";

/**
 * Neighbourhood section: copy, travel times, and an embedded Google map
 * pinned on the villa's Business listing. See `src/lib/googleMaps.ts` for why
 * the embed uses the keyless endpoint and what it costs in cookies.
 */
export function LocationSection() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.location");
  const maps = placeUrl();

  return (
    <section id="location" className="relative scroll-mt-24 bg-surface py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading title={t("heading")} subtitle={t("body")} />

            <dl className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-5">
              {destinations.map((destination) => (
                <div key={destination.key}>
                  <dt className="eyebrow">
                    {destination.content[locale].label}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl">
                    {t(
                      destination.mode === "walk"
                        ? "walkMinutes"
                        : "driveMinutes",
                      { minutes: destination.minutes },
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 text-sm leading-relaxed text-muted">
              {site.address}
            </p>
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("outline", "group mt-6 gap-2")}
            >
              {t("findUs")}
              {/* Up-right arrow: signals the link leaves the site. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
              </svg>
            </a>
          </div>

          {/* Stacked under lg, where it keeps a 4:3 crop inside the gutter.
              From lg it leaves the grid and pins to the section instead, so it
              runs the full height of the band and bleeds past the container to
              the right edge of the window. `left` starts at the container's
              centre line plus the column gap.

              Lazy so Google's scripts and cookies only land once the section
              is scrolled to, not on page load. The keyless embed has no dark
              style, so in dark mode it is dimmed rather than left glaring. */}
          {/* The wrapper does the positioning, not the iframe: an iframe is a
              replaced element, so with `width: auto` it falls back to its
              intrinsic 300px instead of stretching between left and right. */}
          <div className="lg:absolute lg:inset-y-0 lg:left-[calc(50%+2rem)] lg:right-0">
            <iframe
              src={embedUrl(locale)}
              title={t("mapLabel")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="aspect-[4/3] h-full w-full border-0 bg-surface-deep lg:aspect-auto dark:brightness-[0.6]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
