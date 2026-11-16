import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import {
  getActiveProducts,
  getCategories,
  getFeaturedProducts,
} from "@/features/catalog/queries";
import { toCard } from "@/features/catalog/toCard";
import { FeaturedCarousel } from "@/features/catalog/components/FeaturedCarousel";
import { CatalogProductCard } from "@/features/catalog/components/CatalogProductCard";
import {
  CatalogFilters,
  type FilterGroup,
} from "@/features/catalog/components/CatalogFilters";
import { MobileFilters } from "@/features/catalog/components/MobileFilters";

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

  const [categories, featured, all] = await Promise.all([
    getCategories(),
    // Siempre visible: si se ocultara al filtrar, la página "saltaría".
    getFeaturedProducts(),
    getActiveProducts(),
  ]);

  const current = categories.find((c) => c.slug === categoria);
  const brandKey = marca?.toLowerCase();

  const matchesCategory = (p: (typeof all)[number], slug?: string) =>
    !slug || p.category?.slug === slug;
  const matchesBrand = (p: (typeof all)[number], key?: string) =>
    !key || p.brand?.toLowerCase() === key;

  const products = all.filter(
    (p) => matchesCategory(p, categoria) && matchesBrand(p, brandKey),
  );

  // Marcas presentes en el catálogo (respetando mayúsculas de la primera carga).
  const brands = Array.from(
    new Map(
      all
        .filter((p) => p.brand)
        .map((p) => [p.brand!.toLowerCase(), p.brand!] as const),
    ).values(),
  ).sort((a, b) => a.localeCompare(b, "es"));
  const currentBrand = brands.find((b) => b.toLowerCase() === brandKey);

  // Cada conteo respeta el otro filtro activo (ej: "Autos" cuenta solo Pace si
  // hay marca Pace elegida), así nunca se llega a una página vacía sin aviso.
  const groups: FilterGroup[] = [
    {
      title: "Categoría",
      options: [
        {
          label: "Todas",
          href: catalogHref(undefined, currentBrand),
          count: all.filter((p) => matchesBrand(p, brandKey)).length,
          active: !current,
        },
        ...categories.map((c) => ({
          label: c.name,
          href: catalogHref(c.slug, currentBrand),
          count: all.filter(
            (p) => matchesCategory(p, c.slug) && matchesBrand(p, brandKey),
          ).length,
          active: current?.id === c.id,
        })),
      ],
    },
  ];

  if (brands.length > 0) {
    groups.push({
      title: "Marca",
      options: [
        {
          label: "Todas",
          href: catalogHref(current?.slug),
          count: all.filter((p) => matchesCategory(p, current?.slug)).length,
          active: !currentBrand,
        },
        ...brands.map((b) => ({
          label: b,
          href: catalogHref(current?.slug, b),
          count: all.filter(
            (p) =>
              matchesCategory(p, current?.slug) &&
              matchesBrand(p, b.toLowerCase()),
          ).length,
          active: currentBrand === b,
        })),
      ],
    });
  }

  const activeChips = [
    current && {
      label: current.name,
      href: catalogHref(undefined, currentBrand),
    },
    currentBrand && {
      label: currentBrand,
      href: catalogHref(current?.slug),
    },
  ].filter(Boolean) as { label: string; href: string }[];

  const title = [current?.name, currentBrand].filter(Boolean).join(" · ");

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

      <section
        id="resultados"
        className="w-full max-w-350 mx-auto px-5 py-12 md:py-16 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12"
      >
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <CatalogFilters groups={groups} />
          </div>
        </aside>

        <div className="flex flex-col gap-6 min-w-0">
          <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-lightGray">
            <MobileFilters
              activeCount={activeChips.length}
              resultCount={products.length}
            >
              <CatalogFilters groups={groups} />
            </MobileFilters>

            <p className="text-tertiary font-light mr-auto">
              {products.length} producto{products.length === 1 ? "" : "s"}
            </p>

            {activeChips.length > 0 && (
              <div className="w-full sm:w-auto flex flex-wrap items-center gap-2">
                {activeChips.map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    scroll={false}
                    className="flex items-center gap-1.5 bg-lightGray text-primary text-sm pl-3 pr-2 py-1.5 hover:bg-primary hover:text-white transition-colors"
                    aria-label={`Quitar filtro ${chip.label}`}
                  >
                    {chip.label}
                    <X size={14} />
                  </Link>
                ))}
                {activeChips.length > 1 && (
                  <Link
                    href="/productos"
                    scroll={false}
                    className="text-sm text-secondary underline underline-offset-4 hover:text-primary ml-1"
                  >
                    Limpiar filtros
                  </Link>
                )}
              </div>
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
                  scroll={false}
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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {products.map((p, i) => (
                <CatalogProductCard
                  key={p.id}
                  product={toCard(p)}
                  priority={i < 3 && featured.length === 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
