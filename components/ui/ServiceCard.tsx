import { serviceType } from "@/utils/types";
import Image from "next/image";

export default function ServiceCard({
  title,
  description,
  imageSrc,
}: serviceType) {
  return (
    <div className="w-1/4 shrink-0 pl-1 pr-4 group">
      <div className="w-full aspect-154/185 overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={title}
          className="object-cover w-full h-full saturate-0 group-hover:scale-105 group-hover:saturate-100 transition-transform duration-300 ease-in-out"
          fill
          sizes="25vw"
        />
        <div className="absolute inset-0 bg-[#15007e] opacity-30 group-hover:opacity-0 transition-opacity duration-300"></div>
      </div>
      <div>
        <h3 className="text-[24px] leading-[115%] font-semibold mt-3.75 mb-4.5 text-[#5C5E75]">
          {title}
        </h3>
        <p className="text-[#707286] font-light text-[16px] leading-[115%]">
          {description}
        </p>
      </div>
    </div>
  );
}
