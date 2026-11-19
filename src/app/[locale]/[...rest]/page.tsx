import { notFound } from "next/navigation";

/**
 * Catch-all for paths that match no page (e.g. /hr/nonexistent), so they get
 * the localised 404 in src/app/[locale]/not-found.tsx instead of Next's
 * unstyled default.
 */
export default function CatchAll() {
  notFound();
}
