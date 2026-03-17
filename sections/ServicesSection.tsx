"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/utils/constants";

export default function ServicesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
    },
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="embla w-full flex flex-col items-center min-h-screen max-w-screen border-b border-[#15007e]">
      <div className="bg-[#15007e] w-full h-[40%] z-0 absolute"></div>
      <div className="w-full mx-auto px-6 py-16 z-20 ">
        <div className="w-full max-w-350 mx-auto flex">
          <div className="w-[50%]">
            <p className="text-white font-light text-[20px] mb-5">Servicios</p>
            <div className="pt-5 border-t">
              <p className="text-white font-normal text-[40px] leading-[115%]">
                Mantenimineto y Cuidado <br />
                Integral
              </p>
            </div>
          </div>
          <div className="w-[50%] flex items-end justify-end gap-1 pr-4">
            <button
              className="embla__prev border p-3 hover:bg-white transition-all ease-in-out duration-150 cursor-pointer hover:text-[#15007e]"
              onClick={scrollPrev}
            >
              <ArrowLeft />
            </button>
            <button
              className="embla__next border p-3 hover:bg-white transition-all ease-in-out duration-150 cursor-pointer hover:text-[#15007e]"
              onClick={scrollNext}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="embla__viewport max-w-350 z-20" ref={emblaRef}>
        <div className="embla__container flex">
          {services.map((service, index) => {
            return (
              <ServiceCard
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc.src}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
