"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CatalogProductCard, type CardProduct } from "./CatalogProductCard";

export function FeaturedCarousel({ products }: { products: CardProduct[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: products.length > 4 },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  if (products.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4 border-b border-white/40 pb-5">
        <div>
          <p className="text-white font-light text-[16px] lg:text-[20px]">
            Destacados
          </p>
          <h2 className="text-white text-[24px] lg:text-[36px] font-normal leading-[115%]">
            Ofertas y productos recomendados
          </h2>
        </div>
        <div className="hidden sm:flex gap-1">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="border border-white text-white p-3 hover:bg-white hover:text-primary transition-all ease-in-out duration-150 cursor-pointer"
            aria-label="Anterior"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="border border-white text-white p-3 hover:bg-white hover:text-primary transition-all ease-in-out duration-150 cursor-pointer"
            aria-label="Siguiente"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 touch-pan-y">
          {products.map((p, i) => (
            <div
              key={p.id}
              className="min-w-0 shrink-0 grow-0 basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4"
            >
              <CatalogProductCard product={p} priority={i < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
