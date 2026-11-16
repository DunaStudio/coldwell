import Link from "next/link";
import { getAdminProducts } from "@/features/admin/queries";
import { ProductsTable } from "@/features/admin/components/ProductsTable";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-primary text-[28px] lg:text-[36px] font-normal">
            Productos
          </h1>
          <p className="text-secondary font-light">
            {products.length} producto{products.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="border border-primary bg-primary text-white px-6 py-3 hover:bg-white hover:text-primary transition-all duration-150"
        >
          + Nuevo producto
        </Link>
      </div>

      <ProductsTable
        products={products.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          compareAtPrice: p.compareAtPrice,
          isActive: p.isActive,
          isFeatured: p.isFeatured,
          category: p.category?.name ?? null,
          image: p.images[0]?.url ?? null,
        }))}
      />
    </div>
  );
}
