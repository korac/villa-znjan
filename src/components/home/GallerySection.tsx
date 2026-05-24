import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Photo } from "@/components/Photo";

// Editorial asymmetric grid. Swap placeholders for real images in
// public/gallery and pass real srcs here later.
const tiles = [
  { className: "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto" },
  { className: "aspect-[4/3]" },
  { className: "aspect-[4/3]" },
  { className: "aspect-[4/3]" },
  { className: "aspect-[4/3]" },
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
                src={undefined}
                alt={`Villa Žnjan ${i + 1}`}
                index={i + 1}
                sizes="(min-width: 640px) 25vw, 50vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
