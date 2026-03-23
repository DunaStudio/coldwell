"use client";
import HeroDataItem from "@/components/ui/HeroDataItem";
import { heroData } from "@/utils/constants";
import Image from "next/image";
import fondo from "@/public/images/hero/fondo.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useParallax } from "@/hooks/useParallax";
import Logo from "@/public/images/Logo.png";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const parallaxRef = useParallax(0.7);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const lines = [
    { text: "Mucho más que neumáticos", bold: false, delay: "0ms" },
    { text: "cuidamos tu camino", bold: true, delay: "120ms" },
  ];

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
            preload={true}
            quality={75}
            loading="eager"
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
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className={`block ${line.bold ? "font-bold" : "font-light"}`}
                style={{
                  transform: visible ? "translateY(0%)" : "translateY(110%)",
                  opacity: visible ? 1 : 0,
                  transition: `transform 700ms cubic-bezier(0.33, 1, 0.68, 1) ${line.delay}, opacity 500ms ease ${line.delay}`,
                }}
              >
                {line.text}
              </span>
            </div>
          ))}
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
