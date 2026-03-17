"use client";
import { productTypes } from "@/utils/constants";
import Image from "next/image";
import { useState, useRef } from "react";

export default function ProductType() {
  const [selectedType, setSelectedType] = useState(productTypes[0]);
  const [animating, setAnimating] = useState(false);
  const [displayedType, setDisplayedType] = useState(productTypes[0]);
  const prevTypeRef = useRef(productTypes[0]);

  const handleSelectType = (productType: (typeof productTypes)[0]) => {
    if (productType.type === selectedType.type) return;

    setAnimating(true);

    setTimeout(() => {
      setDisplayedType(productType);
      setSelectedType(productType);
      setAnimating(false);
    }, 350);

    prevTypeRef.current = selectedType;
  };

  return (
    <div className="w-full max-w-350 mt-5 mb-40 relative border border-lightGray z-100">
      <div
        className="w-full flex relative overflow-hidden"
        style={{ minHeight: "450px" }}
      >
        <div className="w-[70%] bg-white p-5 z-10 flex flex-col">
          <ul className="flex w-full gap-10 justify-between">
            {productTypes.map((productType, index) => (
              <li
                className={`
                  relative text-[20px] font-normal leading-[115%] cursor-pointer
                  transition-colors duration-200 pb-1
                  ${
                    selectedType.type === productType.type
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  }
                `}
                key={index}
                onClick={() => handleSelectType(productType)}
              >
                {productType.type}

                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
                  style={{
                    width:
                      selectedType.type === productType.type ? "100%" : "0%",
                  }}
                />
              </li>
            ))}
          </ul>

          <div className="flex flex-col flex-1">
            <div className="mt-11 overflow-hidden">
              <p
                className="w-full text-[32px] text-primary font-normal"
                style={{
                  transform: animating ? "translateY(100%)" : "translateY(0%)",
                  opacity: animating ? 0 : 1,
                  transition:
                    "transform 350ms cubic-bezier(0.33, 1, 0.68, 1), opacity 200ms ease",
                }}
              >
                {displayedType.title}
              </p>
            </div>

            <div className="mt-5 overflow-hidden">
              <p
                className="text-[20px] text-secondary font-light"
                style={{
                  transform: animating ? "translateY(100%)" : "translateY(0%)",
                  opacity: animating ? 0 : 1,
                  transition:
                    "transform 350ms cubic-bezier(0.33, 1, 0.68, 1) 60ms, opacity 200ms ease 60ms",
                }}
              >
                {displayedType.description}
              </p>
            </div>

            <button className="mt-auto border bg-primary text-white px-8 py-3 text-[18px] w-min hover:bg-white hover:text-primary hover:border-primary transition-all ease-in-out duration-150 cursor-pointer">
              Consultar
            </button>
          </div>
        </div>

        <div className="w-[30%] relative border-l border-lightGray overflow-hidden">
          <div
            key={`bg-prev-${prevTypeRef.current.type}`}
            className="absolute inset-0"
            style={{
              opacity: animating ? 1 : 0,
              transition: "opacity 300ms ease",
              zIndex: 1,
            }}
          >
            <Image
              src={prevTypeRef.current.bgImageSrc}
              alt={prevTypeRef.current.title}
              fill
              className="object-cover"
            />
          </div>

          <div
            key={`bg-curr-${displayedType.type}`}
            className="absolute inset-0"
            style={{
              opacity: animating ? 0 : 1,
              transition: "opacity 300ms ease",
              zIndex: 2,
            }}
          >
            <Image
              src={displayedType.bgImageSrc}
              alt={displayedType.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute -bottom-30 right-[-5%] w-[45%] h-95 z-20"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? "translateY(20px) scale(0.97)"
            : "translateY(0px) scale(1)",
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
      >
        <Image
          src={displayedType.mainImageSrc}
          alt={displayedType.title}
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
