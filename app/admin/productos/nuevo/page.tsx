import Link from "next/link";
import { getAdminCategories } from "@/features/admin/queries";
import { ProductForm } from "@/features/admin/components/ProductForm";

export default async function NewProductPage() {
  const categories = await getAdminCategories();

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
          Nuevo producto
        </h1>
      </div>
      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
