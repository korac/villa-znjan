"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/Photo";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";

const HERO_IMAGES = ["/hero1.jpg", "/hero2.jpg", "/hero4.jpg", "/hero5.jpg", "/hero6.jpg"];
const SLIDE_MS = 6000;

export function Hero() {
  const t = useTranslations("home.hero");
  const [active, setActive] = useState(0);

  // Advance after each slide's lifetime; manual jumps reset the timer via [active].
  useEffect(() => {
    const id = setTimeout(
      () => setActive((i) => (i + 1) % HERO_IMAGES.length),
      SLIDE_MS,
    );
    return () => clearTimeout(id);
  }, [active]);

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* Crossfading background photos */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <Photo
            src={src}
            alt={t("title")}
            index={0}
            priority={i === 0}
            label="Villa Žnjan"
            sizes="100vw"
          />
        </div>
      ))}
      {/* Scrim for legibility, weighted to the left where the text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/45 to-foreground/15" />

      <Container className="relative">
        <div className="max-w-2xl py-24 text-background [text-shadow:0_2px_16px_rgb(0_0_0/0.75)]">
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

          {/* Slide indicators — one line per image; active line fills over its lifetime */}
          <div className="mt-12 flex gap-3">
            {HERO_IMAGES.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show hero image ${i + 1}`}
                className="group h-1 flex-1 max-w-24 py-2 cursor-pointer"
              >
                <span className="relative block h-0.5 w-full overflow-hidden bg-background/40">
                  <span
                    key={active}
                    className="absolute inset-0 origin-left bg-background"
                    style={{
                      transform:
                        i === active
                          ? undefined
                          : i < active
                            ? "scaleX(1)"
                            : "scaleX(0)",
                      animation:
                        i === active
                          ? `heroProgress ${SLIDE_MS}ms linear forwards`
                          : undefined,
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
