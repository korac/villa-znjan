import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/Button";

/** Localised 404 with the normal site header and footer. */
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center py-32">
        <Container width="narrow">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">404</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {t("text")}
            </p>
            <Link href="/" className={buttonClasses("primary", "mt-10")}>
              {t("home")}
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
