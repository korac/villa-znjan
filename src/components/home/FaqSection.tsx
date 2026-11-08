import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { faqItems } from "@/content/faq";
import type { Locale } from "@/i18n/routing";

/**
 * Frequently asked questions as native <details> rows: no JavaScript,
 * keyboard and screen-reader accessible out of the box, and every answer
 * is in the HTML for search engines.
 */
export function FaqSection() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.faq");

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border py-24">
      <Container width="narrow">
        <SectionHeading title={t("heading")} align="center" />
        <div className="mx-auto mt-12 max-w-3xl border-t border-border">
          {faqItems.map((item) => {
            const copy = item.content[locale];
            return (
              <details key={item.key} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {copy.question}
                  {/* Plus that turns into a cross when the row is open */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="size-3.5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    <path d="M6 1v10M1 6h10" />
                  </svg>
                </summary>
                <p className="pb-6 pr-10 text-base leading-relaxed text-muted">
                  {copy.answer}
                </p>
              </details>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
