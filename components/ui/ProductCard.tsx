"use client";
import { productType } from "@/utils/types";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ProductCard({
  title,
  imageSrc,
  description,
}: productType) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className="w-full border border-lightGray">
      <div className="lg:hidden flex flex-col">
        <div className="relative w-full h-52 overflow-hidden">
          <motion.div className="absolute inset-0 scale-125" style={{ y }}>
            <Image src={imageSrc} alt={title} fill className="object-cover" />
          </motion.div>
        </div>
        <div className="p-5 flex flex-col gap-3">
          <p className="text-primary text-[28px] font-normal">{title}</p>
          <p className="text-secondary text-[16px] font-light">{description}</p>
        </div>
      </div>

      <div className="hidden lg:block relative overflow-hidden group h-87.5">
        <p className="absolute text-white text-center leading-[115%] w-full lg:text-[32px] z-30 font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {title}
        </p>
        <div className="bg-primary opacity-0 group-hover:opacity-30 w-full h-full absolute z-20 transition-all ease-in-out duration-300" />
        <motion.div className="absolute inset-0 scale-125" style={{ y }}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover brightness-75 group-hover:saturate-0 transition-all ease-in-out duration-300"
          />
        </motion.div>
        <div className="absolute inset-0 bg-primary p-5 flex flex-col gap-5 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 z-30">
          <p className="text-white text-[32px] font-semibold">{title}</p>
          <p className="text-white text-[20px] font-light">{description}</p>
        </div>
      </div>
    </div>
  );
}
