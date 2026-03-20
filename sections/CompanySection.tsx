"use client";
import img01 from "@/public/images/empresa/01.jpeg";
import img02 from "@/public/images/empresa/02.jpg";
import img03 from "@/public/images/empresa/03.jpg";
import img04 from "@/public/images/empresa/04.jpg";
import img05 from "@/public/images/empresa/05.jpg";
import img06 from "@/public/images/empresa/06.jpg";
import img07 from "@/public/images/empresa/07.jpg";
import img08 from "@/public/images/empresa/08.jpg";
import img09 from "@/public/images/empresa/09.jpg";
import img10 from "@/public/images/empresa/10.jpg";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const IMG_HEIGHT = 220;
const IMG_WIDTH = 160;
const GAP = 12;

function ImageColumn({
  images,
  direction,
  isMobile,
}: {
  images: any[];
  direction: "up" | "down" | "left" | "right";
  isMobile: boolean;
}) {
  const totalHeight = images.length * (IMG_HEIGHT + GAP);
  const totalWidth = images.length * (IMG_WIDTH + GAP);

  const animateValue = isMobile
    ? direction === "left"
      ? [-totalWidth, 0]
      : [0, -totalWidth]
    : direction === "up"
      ? [-totalHeight, 0]
      : [0, -totalHeight];

  return isMobile ? (
    <div className="w-full overflow-hidden" style={{ height: IMG_HEIGHT }}>
      <motion.div
        className="flex flex-row"
        style={{ gap: GAP }}
        animate={{ x: animateValue }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 overflow-hidden rounded-sm"
            style={{ width: IMG_WIDTH, height: IMG_HEIGHT }}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  ) : (
    <div className="flex-1 overflow-hidden" style={{ height: "100%" }}>
      <motion.div
        className="flex flex-col"
        style={{ gap: GAP }}
        animate={{ y: animateValue }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div
            key={i}
            className="relative w-full shrink-0 overflow-hidden cursor-pointer group rounded-sm"
            style={{ height: IMG_HEIGHT }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function CompanySection() {
  const leftImages = [img01, img02, img03, img04, img05];
  const rightImages = [img06, img07, img08, img09, img10];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="empresa"
      className="lg:h-screen w-full flex justify-center items-center bg-primary overflow-hidden"
    >
      <div className="max-w-350 w-full flex flex-col lg:flex-row gap-10 h-full">
        <div className="w-full lg:w-[35%] flex flex-col justify-center text-white p-5">
          <p className="text-white text-[16px] lg:text-[24px] font-light mb-5">
            ¿Quienes somos?
          </p>
          <hr className="mb-6 lg:mb-10" />
          <h3 className="text-[24px] lg:text-[36px] font-normal leading-[115%] mb-6 lg:mb-10">
            Calidad y servicio en cada detalle de tu vehículo
          </h3>
          <p className="text-[14px] lg:text-[18px] font-light">
            En Coldwell Neumáticos, entendemos que tu vehículo es mucho más que
            un medio de transporte: es lo que te lleva a tu trabajo, a tus
            viajes y, sobre todo, lo que protege a los que más querés. Por eso,
            nos dedicamos a brindar soluciones integrales que garantizan el
            máximo rendimiento y confort en cada kilómetro.
            <br />
            <br />
            No solo vas a encontrar productos de alta gama, sino también el
            respaldo de un equipo apasionado por la mecánica y el servicio al
            cliente. Nuestro compromiso es simple: que manejes con la
            tranquilidad de saber que tu auto está en las mejores manos.
          </p>
        </div>

        <div className="hidden lg:flex w-[60%] gap-3 overflow-hidden h-full">
          <ImageColumn images={leftImages} direction="up" isMobile={false} />
          <ImageColumn images={rightImages} direction="down" isMobile={false} />
        </div>

        <div className="flex lg:hidden w-full flex-col gap-3 mb-10">
          <ImageColumn images={leftImages} direction="left" isMobile={true} />
          <ImageColumn images={rightImages} direction="right" isMobile={true} />
        </div>
      </div>
    </section>
  );
}
