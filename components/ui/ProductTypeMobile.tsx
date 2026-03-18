"use client";
import { productTypes } from "@/utils/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProductTypeMobile() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayed(index);
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const prev = () =>
    goTo(current === 0 ? productTypes.length - 1 : current - 1);
  const next = () =>
    goTo(current === productTypes.length - 1 ? 0 : current + 1);

  const item = productTypes[displayed];

  return (
    <div className="w-full relative mt-5 z-20">
      <div className="bg-white px-6 pt-8 pb-6 flex flex-col gap-4 border border-lightGray">
        <p
          className="text-primary text-[14px] font-semibold uppercase tracking-widest"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 250ms ease, transform 250ms ease",
          }}
        >
          {item.type}
        </p>

        <h3
          className="text-primary text-[28px] font-normal leading-[115%]"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 280ms ease 30ms, transform 280ms ease 30ms",
          }}
        >
          {item.title}
        </h3>

        <p
          className="text-secondary text-[15px] font-light leading-relaxed"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 280ms ease 60ms, transform 280ms ease 60ms",
          }}
        >
          {item.description}
        </p>
      </div>

      <div className="flex items-stretch w-full border-x border-b border-lightGray">
        <button
          onClick={prev}
          className="bg-primary text-white w-16 flex items-center justify-center text-[20px] shrink-0 active:text-primary active:bg-white transition-all ease-in-out duration-150"
        >
          <ArrowLeft />
        </button>

        <button className="flex-1 bg-primary text-white text-[18px] font-light py-4 text-center border-x border-lightGray hover:bg-white hover:text-primary transition-all duration-150 ">
          Consultar
        </button>

        <button
          onClick={next}
          className="bg-primary text-white w-16 flex items-center justify-center text-[20px] shrink-0 active:text-primary active:bg-white transition-all ease-in-out duration-150"
        >
          <ArrowRight />
        </button>
      </div>

      <div className="relative w-full h-80">
        <div className="absolute inset-0 overflow-hidden">
          <div
            style={{
              opacity: animating ? 0 : 1,
              transition: "opacity 300ms ease",
              position: "absolute",
              inset: 0,
            }}
            className="border border-lightGray border-t-0"
          >
            <Image
              src={item.bgImageSrc}
              alt={item.title}
              fill
              preload={true}
              quality={75}
              priority={true}
              className="object-cover"
            />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/5 w-[95%] h-[85%] z-50"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 300ms ease, transform 300ms ease",
          }}
        >
          <Image
            src={item.mainImageSrc}
            alt={item.title}
            fill
            preload={true}
            quality={75}
            priority={true}
            className="object-contain object-bottom"
          />
        </div>
      </div>

      <div className="flex justify-center gap-2 py-4 bg-primary mt-10">
        {productTypes.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-5 h-2" : "bg-white/40 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
