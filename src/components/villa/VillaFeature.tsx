import { Fragment } from "react";
import { useLocale } from "next-intl";
import { Container } from "@/components/Container";
import { Gallery } from "@/components/Gallery";
import { cn } from "@/lib/cn";
import type { VillaSection } from "@/content/villa";
import type { Locale } from "@/i18n/routing";

/**
 * One villa facility as an image/text band. Odd-indexed sections flip so the
 * page alternates image-right, image-left, image-right.
 *
 * Photos render as a mosaic (lead + 2 tiles, the rest behind a "+N" overlay)
 * opening the shared lightbox — the same component the apartment pages use.
 */
export function VillaFeature({
  section,
  index = 0,
}: {
  section: VillaSection;
  index?: number;
}) {
  const locale = useLocale() as Locale;
  const copy = section.content[locale];
  const flipped = index % 2 === 1;

  return (
    <section
      id={section.key}
      className={cn(
        "scroll-mt-24 py-20 sm:py-24",
        flipped ? "bg-surface" : "border-t border-border",
      )}
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={cn(flipped && "lg:order-2")}>
            <Gallery
              images={section.images}
              name={copy.title}
              layout="mosaic"
              offset={index + 1}
            />
          </div>

          <div className={cn(flipped && "lg:order-1")}>
            <p className="eyebrow">{copy.label}</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {copy.description}
            </p>
            {copy.details.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-border pt-5 text-xs uppercase tracking-[0.15em] text-muted">
                {copy.details.map((detail, i) => (
                  <Fragment key={detail}>
                    {i > 0 && (
                      <span aria-hidden className="text-border">
                        ·
                      </span>
                    )}
                    <span className="whitespace-nowrap">{detail}</span>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
