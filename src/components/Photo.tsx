import Image from "next/image";
import { cn } from "@/lib/cn";

// Warm-stone gradient variations for placeholders (until real photos land in /public).
const placeholderGradients = [
  "from-surface via-surface-deep to-surface",
  "from-surface-deep via-surface to-surface-deep",
  "from-surface to-surface-deep",
  "from-surface-deep to-surface",
];

/**
 * Fills its (relative, sized) parent. Renders an optimized next/image when a
 * real `src` is provided, otherwise an elegant stone placeholder.
 */
export function Photo({
  src,
  alt,
  sizes,
  priority,
  index = 0,
  label = "Villa Žnjan",
}: {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  index?: number;
  label?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className="object-cover"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
        placeholderGradients[index % placeholderGradients.length],
      )}
    >
      <span className="eyebrow select-none opacity-60">{label}</span>
    </div>
  );
}
