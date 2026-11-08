import { cn } from "@/lib/cn";

/**
 * Page gutter + max width. `cn` does not merge Tailwind conflicts, so the
 * width is picked through this prop rather than by passing a `max-w-*` class.
 */
const widths = {
  default: "max-w-7xl",
  narrow: "max-w-6xl",
} as const;

export function Container({
  className,
  width = "default",
  children,
}: {
  className?: string;
  width?: keyof typeof widths;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", widths[width], className)}>
      {children}
    </div>
  );
}
