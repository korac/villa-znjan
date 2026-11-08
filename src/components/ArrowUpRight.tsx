import { cn } from "@/lib/cn";

/**
 * Up-right arrow for links that leave the site. Drawn in currentColor, so it
 * follows the link's colour, hover state and colour scheme. Put `group` on
 * the link to get the hover nudge.
 */
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={cn(
        "size-3 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
        className,
      )}
    >
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
    </svg>
  );
}
