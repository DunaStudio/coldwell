"use client";
import HeroDataItem from "@/components/ui/HeroDataItem";
import { heroData } from "@/utils/constants";
import Image from "next/image";
import fondo from "@/public/images/hero/fondo.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useParallax } from "@/hooks/useParallax";

export const HeroSection = () => {
  const parallaxRef = useParallax(0.4); // 0 = sin efecto, 1 = muy pronunciado

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <section
      id="inicio"
      className="relative  flex flex-col items-center font-sans overflow-hidden min-h-[80vh] lg:min-h-screen max-w-screen"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 -top-[20%] -bottom-[20%]"
        >
          <Image
            src={fondo}
            alt="Fondo Hero"
            fill
            className="object-cover object-top saturate-0 brightness-150"
          />
        </div>
      </div>
      <div className="w-full h-full bg-primary opacity-40 absolute z-10 lg:min-h-screen"></div>
      <div className="container mx-auto px-6 relative z-10 mb-8 flex-1 flex flex-col justify-center max-w-350">
        <h1 className="text-white text-[24px] lg:text-[64px] leading-[1.15] font-light tracking-normal text-center lg:text-start">
          Mucho más que neumáticos <br />
          <span className="font-bold">cuidamos tu camino</span>
        </h1>
        <p className="text-white text-[14px] lg:text-[16px] leading-normal mt-4 mx-auto lg:ml-0 max-w-[85%] md:max-w-[70%] lg:max-w-[50%] text-center w-full lg:text-start">
          Morbi tincidunt viverra nisl pharetra vehicula. Nulla facilisi.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae. Praesent cursus porttitor pretium.
        </p>
      </div>

      <div className="relative w-full z-10 items-start justify-between max-w-350 mx-auto gap-10 py-10 hidden lg:flex">
        {heroData.map((item, index) => (
          <HeroDataItem key={index} {...item} />
        ))}
      </div>

      <div className="w-full z-10 py-10 lg:hidden px-10">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {heroData.map((item, index) => (
              <div className="embla__slide" key={index}>
                <HeroDataItem {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
