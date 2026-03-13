import Image from "next/image";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative pt-40 flex flex-col items-center text-center font-sans overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center 40%, #2A178F 0%, #130C39 60%, #09051A 100%)",
      }}
    >
      <div className="container mx-auto px-6 relative z-10 mb-8">
        <h1 className="text-white text-[50px] leading-[1.15] font-light tracking-normal">
          Mucho más que neumáticos <br />
          <span className="font-bold">cuidamos tu camino</span>
        </h1>
      </div>

      <div className="relative w-205.25 h-96.25 mt-8 z-10">
        <Image
          src="/images/Neumatico.png"
          alt="Neumático Coldwell"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
};
