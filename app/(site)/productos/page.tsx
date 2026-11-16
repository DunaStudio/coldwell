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
import { getSale } from "@/utils/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo | Coldwell Neumáticos",
  description:
    "Neumáticos para autos, camionetas, camiones y maquinaria vial y agrícola. Pedí por WhatsApp.",
};

type Filters = { categoria?: string; marca?: string; oferta?: boolean };

function catalogHref({ categoria, marca, oferta }: Filters) {
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (marca) params.set("marca", marca);
  if (oferta) params.set("oferta", "1");
  const qs = params.toString();
  return qs ? `/productos?${qs}` : "/productos";
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; marca?: string; oferta?: string }>;
}) {
  const sp = await searchParams;

  const [categories, featured, all] = await Promise.all([
    getCategories(),
    // Siempre visible: si se ocultara al filtrar, la página "saltaría".
    getFeaturedProducts(),
    getActiveProducts(),
  ]);

  // Marcas presentes en el catálogo (respetando mayúsculas de la primera carga).
  const brands = Array.from(
    new Map(
      all
        .filter((p) => p.brand)
        .map((p) => [p.brand!.toLowerCase(), p.brand!] as const),
    ).values(),
  ).sort((a, b) => a.localeCompare(b, "es"));

  const current = categories.find((c) => c.slug === sp.categoria);
  const currentBrand = brands.find(
    (b) => b.toLowerCase() === sp.marca?.toLowerCase(),
  );
  // Filtros normalizados: los valores inválidos de la URL se ignoran.
  const active: Filters = {
    categoria: current?.slug,
    marca: currentBrand,
    oferta: sp.oferta === "1",
  };
  const filtered = Boolean(active.categoria || active.marca || active.oferta);

  const matches = (p: (typeof all)[number], f: Filters) =>
    (!f.categoria || p.category?.slug === f.categoria) &&
    (!f.marca || p.brand?.toLowerCase() === f.marca.toLowerCase()) &&
    (!f.oferta || getSale(p.price, p.compareAtPrice) !== null);
  const countFor = (f: Filters) => all.filter((p) => matches(p, f)).length;

  const products = all.filter((p) => matches(p, active));
  const saleCount = countFor({ ...active, oferta: true });

  // Cada conteo respeta los otros filtros activos, así nunca se llega a una
  // página vacía sin aviso.
  const groups: FilterGroup[] = [];

  if (saleCount > 0 || active.oferta) {
    groups.push({
      title: "Promociones",
      options: [
        {
          label: "Solo ofertas",
          href: catalogHref({ ...active, oferta: !active.oferta }),
          count: saleCount,
          active: !!active.oferta,
          tone: "sale",
        },
      ],
    });
  }

  groups.push({
    title: "Categoría",
    options: [
      {
        label: "Todas",
        href: catalogHref({ ...active, categoria: undefined }),
        count: countFor({ ...active, categoria: undefined }),
        active: !current,
      },
      ...categories.map((c) => ({
        label: c.name,
        href: catalogHref({ ...active, categoria: c.slug }),
        count: countFor({ ...active, categoria: c.slug }),
        active: current?.id === c.id,
      })),
    ],
  });

  if (brands.length > 0) {
    groups.push({
      title: "Marca",
      options: [
        {
          label: "Todas",
          href: catalogHref({ ...active, marca: undefined }),
          count: countFor({ ...active, marca: undefined }),
          active: !currentBrand,
        },
        ...brands.map((b) => ({
          label: b,
          href: catalogHref({ ...active, marca: b }),
          count: countFor({ ...active, marca: b }),
          active: currentBrand === b,
        })),
      ],
    });
  }

  const activeChips = [
    active.oferta && {
      label: "Ofertas",
      href: catalogHref({ ...active, oferta: false }),
    },
    current && {
      label: current.name,
      href: catalogHref({ ...active, categoria: undefined }),
    },
    currentBrand && {
      label: currentBrand,
      href: catalogHref({ ...active, marca: undefined }),
    },
  ].filter(Boolean) as { label: string; href: string }[];

  const title = [active.oferta && "Ofertas", current?.name, currentBrand]
    .filter(Boolean)
    .join(" · ");

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
