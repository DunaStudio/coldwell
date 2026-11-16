import { getAdminCategories } from "@/features/admin/queries";
import { CategoriesManager } from "@/features/admin/components/CategoriesManager";

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-primary text-[28px] lg:text-[36px] font-normal">
          Categorías
        </h1>
        <p className="text-secondary font-light">
          Se muestran como filtros en el catálogo.
        </p>
      </div>
      <CategoriesManager categories={categories} />
    </div>
  );
}
