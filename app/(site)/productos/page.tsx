import type { Metadata } from "next";
import Link from "next/link";
import {
  getActiveProducts,
  getBrands,
  getCategories,
  getFeaturedProducts,
} from "@/features/catalog/queries";
import { toCard } from "@/features/catalog/toCard";
import { FeaturedCarousel } from "@/features/catalog/components/FeaturedCarousel";
import { CatalogProductCard } from "@/features/catalog/components/CatalogProductCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo | Coldwell Neumáticos",
  description:
    "Neumáticos para autos, camionetas, camiones y maquinaria vial y agrícola. Pedí por WhatsApp.",
};

function catalogHref(categoria?: string, marca?: string) {
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (marca) params.set("marca", marca);
  const qs = params.toString();
  return qs ? `/productos?${qs}` : "/productos";
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; marca?: string }>;
}) {
  const { categoria, marca } = await searchParams;
  const filtered = Boolean(categoria || marca);

  const [categories, brands, featured, products] = await Promise.all([
    getCategories(),
    getBrands(),
    filtered ? Promise.resolve([]) : getFeaturedProducts(),
    getActiveProducts({ categorySlug: categoria, brand: marca }),
  ]);
  const current = categories.find((c) => c.slug === categoria);
  const currentBrand = brands.find(
    (b) => b.toLowerCase() === marca?.toLowerCase(),
  );

  const title = [current?.name, currentBrand].filter(Boolean).join(" · ");

  const tabClass = (active: boolean) =>
    `px-5 py-2.5 border whitespace-nowrap transition-all duration-150 ${
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-primary border-lightGray hover:border-primary"
    }`;

  const chipClass = (active: boolean) =>
    `px-4 py-1.5 border text-sm whitespace-nowrap transition-all duration-150 ${
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-tertiary border-lightGray hover:border-primary hover:text-primary"
    }`;

  return (
    <div className="w-full">
      <section className="bg-primary w-full pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="w-full max-w-350 mx-auto px-5 flex flex-col gap-12">
          <div>
            <p className="text-white font-light text-[16px] lg:text-[24px] mb-5">
              Catálogo
            </p>
            <div className="pt-5 border-t border-white/40">
              <h1 className="text-white text-[28px] lg:text-[48px] font-normal leading-[115%]">
                {title || "Todos nuestros productos"}
              </h1>
              <p className="text-white/80 font-light mt-3 max-w-2xl">
                {current?.description ??
                  "Armá tu pedido y envialo por WhatsApp. Te confirmamos disponibilidad, colocación y forma de pago."}
              </p>
            </div>
          </div>
          {featured.length > 0 && (
            <FeaturedCarousel products={featured.map(toCard)} />
          )}
        </div>
      </section>

      <section className="w-full max-w-350 mx-auto px-5 py-12 md:py-16 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {categories.length > 0 && (
            <nav className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5">
              <Link
                href={catalogHref(undefined, currentBrand)}
                className={tabClass(!current)}
                scroll={false}
              >
                Todos
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={catalogHref(c.slug, currentBrand)}
                  className={tabClass(current?.id === c.id)}
                  scroll={false}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          )}

          {brands.length > 1 && (
            <nav className="flex items-center gap-2 overflow-x-auto pb-2 -mx-5 px-5">
              <span className="text-secondary text-sm font-light mr-1 shrink-0">
                Marca:
              </span>
              <Link
                href={catalogHref(current?.slug)}
                className={chipClass(!currentBrand)}
                scroll={false}
              >
                Todas
              </Link>
              {brands.map((b) => (
                <Link
                  key={b}
                  href={catalogHref(current?.slug, b)}
                  className={chipClass(currentBrand === b)}
                  scroll={false}
                >
                  {b}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {products.length === 0 ? (
          <div className="border border-lightGray p-12 text-center flex flex-col items-center gap-4">
            <p className="text-secondary font-light">
              {filtered
                ? "No hay productos con estos filtros por ahora."
                : "Estamos cargando el catálogo. ¡Volvé pronto!"}
            </p>
            {filtered && (
              <Link
                href="/productos"
                className="text-primary underline underline-offset-4"
              >
                Ver todos los productos
              </Link>
            )}
            <a
              href={`https://wa.me/542646252213?text=${encodeURIComponent("Hola Coldwell! Quería hacer una consulta.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary bg-primary text-white px-8 py-3 hover:bg-white hover:text-primary transition-all duration-150"
            >
              Consultar por WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {products.map((p, i) => (
              <CatalogProductCard
                key={p.id}
                product={toCard(p)}
                priority={i < 4 && featured.length === 0}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
