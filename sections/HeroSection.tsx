import HeroDataItem from "@/components/ui/HeroDataItem";
import { heroData } from "@/utils/constants";
import Image from "next/image";
import fondo from "@/public/images/hero/fondo.png";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative pt-40 flex flex-col items-center  font-sans overflow-hidden min-h-screen max-w-screen"
      style={{
        backgroundImage: `url(${fondo.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-6 relative z-10 mb-8 flex-1 flex flex-col justify-center max-w-350">
        <h1 className="text-white text-[64px] leading-[1.15] font-light tracking-normal">
          Mucho más que neumáticos <br />
          <span className="font-bold">cuidamos tu camino</span>
        </h1>
        <p className="text-white text-[16px] leading-normal mt-4 max-w-[50%]">
          Morbi tincidunt viverra nisl pharetra vehicula. Nulla facilisi.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae. Praesent cursus porttitor pretium.
        </p>
      </div>

      <div className="relative w-full z-10 flex items-start justify-between max-w-350 mx-auto gap-10 py-10">
        {heroData.map((item, index) => (
          <HeroDataItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};
