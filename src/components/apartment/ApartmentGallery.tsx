"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { Photo } from "@/components/Photo";

/**
 * Unit-page image gallery: the same hero + 2×2 tile grid as before, but every
 * tile opens a full-screen lightbox (zoom, thumbnails, counter) showing all of
 * the apartment's photos. Falls back to non-interactive placeholders when the
 * unit has no real photos yet.
 */
export function ApartmentGallery({
  images,
  name,
  order,
}: {
  images: string[];
  name: string;
  order: number;
}) {
  const [index, setIndex] = useState(-1);
  const hasImages = images.length > 0;

  // 4 secondary tiles (images[1..4]); undefined slots render placeholders.
  const tiles = Array.from({ length: 4 }, (_, i) => images[i + 1]);

  const openAt = (i: number) => {
    if (hasImages) setIndex(i);
  };

  const tileClass = hasImages
    ? "group relative aspect-[4/3] cursor-zoom-in overflow-hidden"
    : "relative aspect-[4/3] overflow-hidden";

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-2">
        <button
          type="button"
          onClick={() => openAt(0)}
          disabled={!hasImages}
          aria-label={hasImages ? `Open ${name} gallery` : undefined}
          className={
            hasImages
              ? "group relative aspect-[4/3] cursor-zoom-in overflow-hidden lg:aspect-auto"
              : "relative aspect-[4/3] overflow-hidden lg:aspect-auto"
          }
        >
          <Photo
            src={images[0]}
            alt={name}
            index={order}
            priority
            label={name}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </button>

        <div className="grid grid-cols-2 gap-3">
          {tiles.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openAt(i + 1)}
              disabled={!hasImages}
              aria-label={hasImages ? `Open ${name} gallery` : undefined}
              className={tileClass}
            >
              <Photo
                src={src}
                alt={`${name} ${i + 2}`}
                index={order + i + 1}
                label={name}
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              {/* Show remaining-count overlay on the last visible tile. */}
              {hasImages && i === 3 && images.length > 5 && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/45 font-serif text-2xl text-white">
                  +{images.length - 5}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

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
