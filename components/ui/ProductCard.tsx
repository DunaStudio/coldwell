import { productType } from "@/utils/types";
import Image from "next/image";

export default function ProductCard({
  title,
  imageSrc,
  description,
}: productType) {
  return (
    <div className="w-full relative overflow-hidden group h-87.5">
      <div className="relative w-full h-full">
        <p className="absolute text-white text-[32px] z-30 font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {title}
        </p>
        <div className="bg-primary opacity-0 group-hover:opacity-30 w-full h-full absolute z-20 transition-all ease-in-out duration-300"></div>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover brightness-75 saturate-100 group-hover:saturate-0 transition-all ease-in-out duration-300"
        />
      </div>

      <div className="absolute inset-0 bg-primary p-5 flex flex-col gap-5 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 z-30">
        <p className="text-white text-[32px] font-semibold">{title}</p>
        <p className="text-white text-[20px] font-light">{description}</p>
      </div>
    </div>
  );
}
