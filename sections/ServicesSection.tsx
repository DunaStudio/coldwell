"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: isMobile ? "center" : "start",
    slidesToScroll: 1,
    loop: true,
  });

  useEffect(() => {
    emblaApi?.reInit({ align: isMobile ? "center" : "start", loop: true });
  }, [isMobile, emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="w-full flex flex-col items-center max-w-screen border-b border-primary relative overflow-hidden">
      <div className="bg-primary w-full h-[60%] z-0 absolute top-0 left-0" />

      <div className="w-full mx-auto px-6 py-16 z-20">
        <div className="w-full max-w-350 mx-auto flex">
          <div className="w-full lg:w-[50%]">
            <p className="text-white font-light text-[16px] lg:text-[24px] mb-5">
              Servicios
            </p>
            <div className="pt-5 border-t border-white/40">
              <p className="text-white text-[24px] lg:text-[36px] font-normal leading-[115%]">
                Mantenimiento y Cuidado <br className="hidden lg:block" />
                Integral
              </p>
            </div>
          </div>

          <div className="hidden lg:flex w-[50%] items-end justify-end gap-1 pr-4">
            <button
              onClick={scrollPrev}
              className="border border-white text-white p-3 hover:bg-white hover:text-primary transition-all ease-in-out duration-150 cursor-pointer"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={scrollNext}
              className="border border-white text-white p-3 hover:bg-white hover:text-primary transition-all ease-in-out duration-150 cursor-pointer"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-350 z-20 mb-10 lg:mb-30">
        <button
          onClick={scrollPrev}
          className="ml-5 lg:hidden absolute left-0 top-[28%] -translate-y-1/2 z-30 bg-white text-primary border border-lightGray p-3"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={scrollNext}
          className="mr-5 lg:hidden absolute right-0 top-[28%] -translate-y-1/2 z-30 bg-white text-primary border border-lightGray p-3"
        >
          <ArrowRight size={18} />
        </button>

        <div className="embla__viewport w-full" ref={emblaRef}>
          <div className="embla__container">
            {services.map((service, index) => (
              <ServiceCard
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc.src}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
