import { serviceType } from "@/utils/types";
import Image from "next/image";

export default function ServiceCard({
  title,
  description,
  imageSrc,
}: serviceType) {
  return (
    <div className="w-[70vw] md:w-1/2 lg:w-1/4 shrink-0 px-2 lg:px-5  group">
      <div className="w-full aspect-video lg:aspect-154/185 overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={title}
          className="object-cover w-full h-full"
          fill
          loading="lazy"
          sizes="100vw"
        />
      </div>
      <div>
        <h3 className="text-[18px] md:text-[18px] lg:text-[24px] leading-[115%] font-medium lg:font-semibold mt-3.75 mb-4.5 text-[#5C5E75]">
          {title}
        </h3>
        <p className="text-secondary font-light text-[14px] lg:text-[16px] leading-[115%]">
          {description}
        </p>
      </div>
    </div>
  );
}
