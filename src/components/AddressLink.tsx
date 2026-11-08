import { useTranslations } from "next-intl";
import { placeUrl } from "@/lib/googleMaps";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ArrowUpRight";

/**
 * The villa's address in the visitor's language, linking to its Google
 * Business listing in a new tab. Inherits colour from its parent and
 * darkens on hover, like the email link next to it; the arrow marks it as
 * leaving the site.
 */
export function AddressLink({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <a
      href={placeUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        // text-decoration rather than a border-bottom, so the underline still
        // works when the address wraps onto a second line (narrow footer).
        "group underline decoration-muted/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground",
        className,
      )}
    >
      {t("address")}
      <ArrowUpRight className="ml-1 inline-block align-baseline" />
    </a>
  );
}
