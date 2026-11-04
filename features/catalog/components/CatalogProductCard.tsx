"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ImageOff } from "lucide-react";
import { formatPrice } from "@/utils/format";
import { AddToCartButton } from "./AddToCartButton";

export type CardProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  image: string | null;
  category: string | null;
};

export function CatalogProductCard({
  product,
  priority = false,
}: {
  product: CardProduct;
  priority?: boolean;
}) {
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const discount = onSale
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group border border-lightGray bg-white flex flex-col h-full"
    >
      <Link
        href={`/productos/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-lightGray"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-secondary">
            <ImageOff size={32} strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        {onSale && (
          <span className="absolute top-0 left-0 bg-primary text-white text-sm px-3 py-1">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1">
        {product.category && (
          <p className="text-secondary text-xs uppercase tracking-wider font-light">
            {product.category}
          </p>
        )}
        <Link
          href={`/productos/${product.slug}`}
          className="text-primary text-[18px] leading-tight hover:underline"
        >
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2 flex-wrap mt-auto pt-2">
          <span className="text-primary text-[20px] font-medium">
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-secondary text-sm line-through font-light">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
        <AddToCartButton
          product={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
          }}
          compact
        />
      </div>
    </motion.article>
  );
}
