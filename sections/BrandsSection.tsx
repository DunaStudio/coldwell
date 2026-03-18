"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { brands } from "@/utils/constants";

export default function BrandsSection() {
  return (
    <section className="w-full flex flex-col items-center py-24 bg-white overflow-hidden">
      <h3 className="text-[#15007E] text-[40px] font-normal leading-[140%] mb-16 text-center">
        Marcas con las que trabajamos
      </h3>

      <div className="w-full relative overflow-hidden flex">
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
    </section>
  );
}
