import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Fragment, type ReactNode } from "react";
import { routing, type Locale } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { privacy, PRIVACY_UPDATED, type PrivacyBlock } from "@/content/privacy";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: `${privacy[locale].title} - Villa Žnjan` };
}

const linkClass =
  "underline decoration-muted/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

/**
 * Inline markup for policy text: **bold**, email addresses as mailto links,
 * and azop.hr as a link to the Croatian data protection authority.
 */
function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[a-z]{2,}|azop\.hr)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-medium text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.includes("@")) {
        return (
          <a key={i} href={`mailto:${part}`} className={linkClass}>
            {part}
          </a>
        );
      }
      if (part === "azop.hr") {
        return (
          <a
            key={i}
            href="https://azop.hr"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {part}
          </a>
        );
      }
      return <Fragment key={i}>{part}</Fragment>;
    });
}

function Block({ block }: { block: PrivacyBlock }) {
  switch (block.type) {
    case "p":
      return <p>{inline(block.text)}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-border">
          {block.items.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ul>
      );
    case "lines":
      return (
        <p>
          {block.lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {inline(line)}
            </Fragment>
          ))}
        </p>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                {block.head.map((h) => (
                  <th key={h} className="eyebrow py-3 pr-4 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-border align-top">
                  {row.map((cell, c) => (
                    <td key={c} className="py-3 pr-4">
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = privacy[locale];
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    new Date(PRIVACY_UPDATED),
  );

  return (
    <main className="py-24">
      <Container width="narrow">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">
            {copy.updated}: {updated}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            {copy.intro}
          </p>

          {copy.sections.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-serif text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </Container>
    </main>
  );
}
