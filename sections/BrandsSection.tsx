"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { brands } from "@/utils/constants";

const firstHalf = brands.slice(0, Math.ceil(brands.length / 2));
const secondHalf = brands.slice(Math.ceil(brands.length / 2));

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: typeof brands;
  direction?: "left" | "right";
}) {
  const repeated = [...items, ...items, ...items];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div className="w-full relative overflow-hidden flex">
      <motion.div
        className="flex gap-12 min-w-max items-center"
        animate={{ x: [from, to] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((brand, index) => (
          <div
            key={index}
            className="relative w-36 h-24 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Image
              src={brand.imageSrc}
              alt={brand.name}
              fill
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function BrandsSection() {
  return (
    <section className="w-full flex flex-col items-center py-16 lg:py-24 bg-white overflow-hidden">
      <h3 className="text-[#15007E] text-[24px] lg:text-[36px] font-normal leading-[115%] mb-16 text-center">
        Marcas con las que trabajamos
      </h3>

      <div className="hidden lg:flex w-full relative overflow-hidden">
        <motion.div
          className="flex gap-20 min-w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="relative w-55 h-37.5 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Image
                src={brand.imageSrc}
                alt={brand.name}
                fill
                className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex lg:hidden w-full flex-col gap-8">
        <MarqueeRow items={firstHalf} direction="left" />
        <MarqueeRow items={secondHalf} direction="right" />
      </div>
    </section>
  );
}
