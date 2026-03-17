import { heroDataType } from "@/utils/types";
import Image from "next/image";

export default function HeroDataItem({
  title,
  subtitle,
  imageSrc,
}: heroDataType) {
  return (
    <div className="w-full flex gap-5">
      <div className="w-20 aspect-square">
        <Image src={imageSrc} alt={title} width={150} height={150} />
      </div>
      <div className="flex flex-col gap-1.5 w-[60%]">
        <p className="text-[24px] font-semibold leading-[115%]">{title}</p>
        <p className="text-[18px] leading-[115%] font-light opacity-80">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
