"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { Photo } from "@/components/Photo";
import { cn } from "@/lib/cn";

/**
 * Shared image gallery: a lead photo plus secondary tiles, every one of which
 * opens a full-screen lightbox (zoom, thumbnails, counter) over the complete
 * set. Photos beyond the visible tiles collapse into a "+N" overlay.
 *
 * Two layouts:
 *   "hero"   — full-width lead + 2×2 tile grid (5 visible). Apartment pages.
 *   "mosaic" — full-width lead + 2 tiles side by side (3 visible). Villa
 *              bands, where the gallery is one half of a two-column band.
 *              All three tiles stay landscape, matching the photography.
 *
 * Falls back to non-interactive stone placeholders when `images` is empty.
 */

export type GalleryLayout = "hero" | "mosaic";

// Tiles shown beside the lead photo; the rest hide behind the "+N" overlay.
const SECONDARY_TILES: Record<GalleryLayout, number> = { hero: 4, mosaic: 2 };

const LEAD_SIZES: Record<GalleryLayout, string> = {
  hero: "(min-width: 1024px) 50vw, 100vw",
  mosaic: "(min-width: 1024px) 50vw, 100vw",
};

const TILE_SIZES: Record<GalleryLayout, string> = {
  hero: "(min-width: 1024px) 25vw, 50vw",
  mosaic: "(min-width: 1024px) 25vw, 50vw",
};

export function Gallery({
  images,
  name,
  layout = "hero",
  offset = 0,
  priority = false,
}: {
  images: string[];
  /** Used for alt text, the placeholder label, and the lightbox aria-label */
  name: string;
  layout?: GalleryLayout;
  /** Seeds placeholder gradient variety so adjacent galleries differ */
  offset?: number;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(-1);
  const hasImages = images.length > 0;

  const secondaryCount = SECONDARY_TILES[layout];
  const tiles = Array.from({ length: secondaryCount }, (_, i) => images[i + 1]);
  const remaining = images.length - (secondaryCount + 1);

  const openAt = (i: number) => {
    if (hasImages) setIndex(i);
  };

  const tileProps = (i: number) => ({
    type: "button" as const,
    onClick: () => openAt(i),
    disabled: !hasImages,
    "aria-label": hasImages ? `Open ${name} gallery` : undefined,
  });

  const zoom = hasImages ? "cursor-zoom-in" : "";

  return (
    <>
      {layout === "mosaic" ? (
        <div className="grid gap-3">
          <button
            {...tileProps(0)}
            className={cn("relative aspect-[3/2] overflow-hidden", zoom)}
          >
            <Photo
              src={images[0]}
              alt={name}
              index={offset}
              priority={priority}
              label={name}
              sizes={LEAD_SIZES.mosaic}
            />
          </button>

          <div className="grid grid-cols-2 gap-3">
            {tiles.map((src, i) => (
              <button
                key={i}
                {...tileProps(i + 1)}
                className={cn("relative aspect-[3/2] overflow-hidden", zoom)}
              >
                <Photo
                  src={src}
                  alt={`${name} ${i + 2}`}
                  index={offset + i + 1}
                  label={name}
                  sizes={TILE_SIZES.mosaic}
                />
                {hasImages && i === secondaryCount - 1 && remaining > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 font-serif text-2xl text-white">
                    +{remaining}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          <button
            {...tileProps(0)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden lg:aspect-auto",
              zoom,
            )}
          >
            <Photo
              src={images[0]}
              alt={name}
              index={offset}
              priority={priority}
              label={name}
              sizes={LEAD_SIZES.hero}
            />
          </button>

          <div className="grid grid-cols-2 gap-3">
            {tiles.map((src, i) => (
              <button
                key={i}
                {...tileProps(i + 1)}
                className={cn("relative aspect-[4/3] overflow-hidden", zoom)}
              >
                <Photo
                  src={src}
                  alt={`${name} ${i + 2}`}
                  index={offset + i + 1}
                  label={name}
                  sizes={TILE_SIZES.hero}
                />
                {hasImages && i === secondaryCount - 1 && remaining > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 font-serif text-2xl text-white">
                    +{remaining}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasImages && (
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={images.map((src) => ({ src }))}
          plugins={[Thumbnails, Counter]}
          thumbnails={{ border: 0, borderRadius: 0 }}
          controller={{ closeOnBackdropClick: true }}
        />
      )}
    </>
  );
}
