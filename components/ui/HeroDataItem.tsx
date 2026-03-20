import { heroDataType } from "@/utils/types";
import Image from "next/image";

export default function HeroDataItem({
  title,
  subtitle,
  imageSrc,
}: heroDataType) {
  return (
    <div className="w-full flex gap-3 lg:gap-5 justify-center items-center lg:items-start">
      <div className="w-16 lg:w-20 aspect-square relative">
        <Image src={imageSrc} alt={title} fill className="object-contain" />
      </div>
      <div className="flex flex-col gap-1.5 w-auto lg:w-[60%]">
        <p className="text-[16px] lg:text-[18px] xl:text-[20px] font-semibold leading-[115%] text-white">
          {title}
        </p>
        <p className="text-[12px] lg:text-[14px] xl:text-[16px] leading-[115%] font-light opacity-80 text-white">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
