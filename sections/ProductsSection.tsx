import ProductCard from "@/components/ui/ProductCard";
import ProductType from "@/components/ui/ProductType";
import ProductTypeMobile from "@/components/ui/ProductTypeMobile";
import { products } from "@/utils/constants";

export default function ProductsSection() {
  return (
    <div className="w-full flex flex-col justify-center items-center relative bg-white">
      <h3 className="text-primary text-[24px] lg:text-[40px] font-normal leading-[115%] my-10">
        Nuestros productos
      </h3>
      <div className="max-w-350 w-full mx-auto flex flex-col md:flex-row px-5 gap-5 ">
        {products.map((product, index) => {
          return (
            <ProductCard
              title={product.title}
              description={product.description}
              imageSrc={product.imageSrc}
              key={index}
            />
          );
        })}
      </div>
      <div className="lg:hidden w-full px-5">
        <ProductTypeMobile />
      </div>
      <div className=" max-w-350 hidden lg:flex lg:justify-center w-full mx-auto px-5 ">
        <ProductType />
      </div>
      <div className="bg-primary w-full h-[35%] absolute bottom-0 border-red-500 z-10"></div>
    </div>
  );
}
