import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export function ContactSection({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations();

  return (
    <section id="contact" className={`scroll-mt-24 ${className}`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + direct contact details */}
          <div>
            <SectionHeading
              eyebrow={t("nav.contact")}
              title={t("contact.heading")}
              subtitle={t("contact.subheading")}
            />
            <dl className="mt-10 space-y-6 text-sm">
              <div>
                <dt className="eyebrow">{t("footer.contactHeading")}</dt>
                <dd className="mt-2 space-y-1 text-muted">
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
                </dd>
              </div>
              <div>
                <dt className="eyebrow">{t("nav.location")}</dt>
                <dd className="mt-2 text-muted">{t("footer.address")}</dd>
              </div>
            </dl>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
