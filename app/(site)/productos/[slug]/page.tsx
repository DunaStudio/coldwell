import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/catalog/queries";
import { ProductGallery } from "@/features/catalog/components/ProductGallery";
import { AddToCartButton } from "@/features/catalog/components/AddToCartButton";
import { WHATSAPP_NUMBER } from "@/features/cart/whatsapp";
import { formatPrice, getSale } from "@/utils/format";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado | Coldwell Neumáticos" };
  return {
    title: `${product.name} | Coldwell Neumáticos`,
    description: product.description?.slice(0, 160) ?? undefined,
    openGraph: product.images[0]
      ? { images: [{ url: product.images[0].url }] }
      : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const sale = getSale(product.price, product.compareAtPrice);

  const consult = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola Coldwell! Quería consultar por: ${product.name}`,
  )}`;

  return (
    <div className="w-full max-w-350 mx-auto px-5 pt-28 md:pt-36 pb-16">
      <nav className="text-sm text-secondary font-light mb-6 flex gap-2 flex-wrap">
        <Link href="/productos" className="hover:text-primary">
          Catálogo
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              href={`/productos?categoria=${product.category.slug}`}
              className="hover:text-primary"
            >
              {product.category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        <ProductGallery
          images={product.images.map((i) => ({ url: i.url, alt: i.alt }))}
          name={product.name}
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 pb-6 border-b border-lightGray">
            {product.brand && (
              <Link
                href={`/productos?marca=${encodeURIComponent(product.brand)}`}
                className="text-secondary text-sm uppercase tracking-wider font-light hover:text-primary w-fit"
              >
                {product.brand}
              </Link>
            )}
            <h1 className="text-primary text-[28px] lg:text-[40px] font-normal leading-[115%]">
              {product.name}
            </h1>
            {sale ? (
              <div className="flex flex-col gap-3 mt-2">
                <span className="flex items-stretch w-fit text-sm font-medium">
                  <span className="bg-sale text-white px-3 py-1 uppercase tracking-wider">
                    Oferta
                  </span>
                  <span className="bg-white text-sale border border-sale px-2.5 py-1">
                    -{sale.discount}%
                  </span>
                </span>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-primary text-[36px] font-medium leading-none">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-secondary text-[20px] line-through font-light">
                    {formatPrice(sale.compareAtPrice)}
                  </span>
                </div>
                <span className="text-sale">
                  Ahorrás {formatPrice(sale.savings)}
                </span>
              </div>
            ) : (
              <span className="text-primary text-[32px] font-medium">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-secondary text-[16px] lg:text-[18px] font-light whitespace-pre-line">
              {product.description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <AddToCartButton
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0]?.url ?? null,
              }}
            />
            <a
              href={consult}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-primary text-primary px-8 py-4 text-[18px] hover:bg-primary hover:text-white transition-all duration-150"
            >
              Consultar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
