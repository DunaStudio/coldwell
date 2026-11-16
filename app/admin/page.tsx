import Link from "next/link";
import { getAdminStats } from "@/features/admin/queries";

export default async function AdminHome() {
  const stats = await getAdminStats();

  const cards = [
    { label: "Productos activos", value: stats.active, sub: `de ${stats.total} en total` },
    { label: "Destacados", value: stats.featured, sub: "en el carrusel" },
    { label: "Categorías", value: stats.categories, sub: "creadas" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-primary text-[28px] lg:text-[36px] font-normal">
          Resumen
        </h1>
        <p className="text-secondary font-light">
          Lo que cargues acá se refleja al instante en el catálogo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-lightGray p-6">
            <p className="text-secondary font-light text-sm">{c.label}</p>
            <p className="text-primary text-[40px] leading-tight">{c.value}</p>
            <p className="text-secondary font-light text-sm">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/productos/nuevo"
          className="border border-primary bg-primary text-white px-6 py-3 hover:bg-white hover:text-primary transition-all duration-150"
        >
          + Nuevo producto
        </Link>
        <Link
          href="/admin/categorias"
          className="border border-primary text-primary bg-white px-6 py-3 hover:bg-primary hover:text-white transition-all duration-150"
        >
          Gestionar categorías
        </Link>
      </div>
    </div>
  );
}
