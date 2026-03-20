"use client";
import HeroDataItem from "@/components/ui/HeroDataItem";
import { heroData } from "@/utils/constants";
import Image from "next/image";
import fondo from "@/public/images/hero/fondo.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useParallax } from "@/hooks/useParallax";
import Logo from "@/public/images/Logo.png";

export const HeroSection = () => {
  const parallaxRef = useParallax(0.4);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <section
      id="inicio"
      className="relative flex flex-col items-center font-sans overflow-hidden min-h-screen max-w-screen"
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
      <div className="w-full h-full bg-primary opacity-40 absolute z-10 min-h-screen"></div>
      <div className="container mx-auto px-6 relative z-10 mb-8 flex-1 flex flex-col justify-center max-w-350">
        <div className="w-full max-w-[70vw] md:max-w-350 flex justify-center items-center relative mb-5 h-30 lg:hidden mx-auto">
          <Image
            src={Logo}
            alt="Codlwell Logo"
            className="object-contain"
            fill
          />
        </div>
        <h1 className="text-white text-[24px] lg:text-[64px] leading-[1.15] font-light tracking-normal text-center lg:text-start">
          Mucho más que neumáticos <br />
          <span className="font-bold">cuidamos tu camino</span>
        </h1>
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
