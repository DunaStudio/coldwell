import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import {
  getAdminBrands,
  getAdminCategories,
  getAdminProduct,
} from "@/features/admin/queries";
import { ProductForm } from "@/features/admin/components/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) notFound();

  const [product, categories, brands] = await Promise.all([
    getAdminProduct(id),
    getAdminCategories(),
    getAdminBrands(),
  ]);
  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/productos"
          className="text-secondary text-sm font-light hover:text-primary"
        >
          ← Productos
        </Link>
        <h1 className="text-primary text-[28px] lg:text-[36px] font-normal">
          Editar producto
        </h1>
      </div>
      <ProductForm
        id={product.id}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        brands={brands}
        initial={{
          name: product.name,
          slug: product.slug,
          brand: product.brand ?? "",
          description: product.description ?? "",
          price: String(product.price),
          compareAtPrice:
            product.compareAtPrice != null ? String(product.compareAtPrice) : "",
          categoryId: product.categoryId ?? "",
          isActive: product.isActive,
          isFeatured: product.isFeatured,
          images: product.images.map((i) => ({ url: i.url, alt: i.alt ?? "" })),
        }}
      />
    </div>
  );
}
