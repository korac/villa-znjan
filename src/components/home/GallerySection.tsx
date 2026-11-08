import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Photo } from "@/components/Photo";

// Editorial asymmetric grid: one large lead tile, four small ones.
// Photos from the 2026 shoot. They share files with the /villa sections
// (public/gallery/<topic>/), so each photo exists only once.
const tiles = [
  {
    src: "/gallery/outdoor/garden-path.jpg",
    className: "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto",
    // Half the grid from sm up, one of two columns below it.
    sizes: "(min-width: 1280px) 640px, 50vw",
  },
  { src: "/gallery/pool/DSC07632.jpg", className: "aspect-[4/3]" },
  { src: "/gallery/outdoor/outdoor-grill-3.jpg", className: "aspect-[4/3]" },
  { src: "/gallery/outdoor/entrance.jpg", className: "aspect-[4/3]" },
  { src: "/gallery/pool/DSC07691.jpg", className: "aspect-[4/3]" },
];

export function GallerySection() {
  const t = useTranslations("home.gallery");

  return (
    <section id="gallery" className="scroll-mt-24 bg-surface py-24">
      <Container>
        <SectionHeading title={t("heading")} align="center" />
        <div className="mt-14 grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={`relative overflow-hidden ${tile.className}`}
            >
              <Photo
                src={tile.src}
                alt={`Villa Žnjan ${i + 1}`}
                index={i + 1}
                sizes={tile.sizes ?? "(min-width: 640px) 25vw, 50vw"}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
