import ProductCard from "@/components/ui/ProductCard";
import ProductType from "@/components/ui/ProductType";
import { products } from "@/utils/constants";

export default function ProductsSection() {
  return (
    <div className="w-full flex flex-col justify-center items-center relative bg-white">
      <h3 className="text-primary text-[40px] font-normal leading-[115%] my-10">
        Nuestros productos
      </h3>
      <div className="max-w-350 w-full mx-auto flex gap-5">
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
      <ProductType />
      <div className="bg-primary w-full h-[40%] absolute bottom-0 border-red-500 z-10"></div>
    </div>
  );
}
