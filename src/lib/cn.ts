/**
 * Minimal className combiner. Filters out falsy values and joins with spaces.
 * (Kept dependency-free; swap for clsx/tailwind-merge later if needed.)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
