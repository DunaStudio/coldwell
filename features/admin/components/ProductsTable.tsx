"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, Star, Trash2 } from "lucide-react";
import { deleteProduct } from "@/features/admin/actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { formatPrice } from "@/utils/format";

type Row = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  isActive: boolean;
  isFeatured: boolean;
  category: string | null;
  image: string | null;
};

export function ProductsTable({ products }: { products: Row[] }) {
  const router = useRouter();
  const [toDelete, setToDelete] = useState<Row | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const confirmDelete = () => {
    if (!toDelete) return;
    startTransition(async () => {
      const res = await deleteProduct(toDelete.id);
      if (!res.ok) {
        setError(res.error);
      } else {
        setError(null);
        router.refresh();
      }
      setToDelete(null);
    });
  };

  if (products.length === 0) {
    return (
      <div className="bg-white border border-lightGray p-10 text-center text-secondary font-light">
        Todavía no hay productos. Creá el primero con “Nuevo producto”.
      </div>
    );
  }

  return (
    <>
      {error && (
        <p className="border border-red-600 text-red-600 bg-white px-4 py-3">
          {error}
        </p>
      )}

      <div className="bg-white border border-lightGray divide-y divide-lightGray">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-3 md:p-4">
            <div className="relative w-16 h-16 shrink-0 bg-lightGray">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/admin/productos/${p.id}`}
                  className="text-primary hover:underline truncate"
                >
                  {p.name}
                </Link>
                {p.isFeatured && (
                  <Star
                    size={14}
                    className="text-primary fill-primary"
                    aria-label="Destacado"
                  />
                )}
                {!p.isActive && (
                  <span className="text-xs border border-secondary text-secondary px-2 py-0.5">
                    Oculto
                  </span>
                )}
              </div>
              <p className="text-secondary font-light text-sm">
                {p.category ?? "Sin categoría"} ·{" "}
                {p.compareAtPrice && (
                  <span className="line-through mr-1">
                    {formatPrice(p.compareAtPrice)}
                  </span>
                )}
                {formatPrice(p.price)}
              </p>
            </div>

            <div className="flex gap-1 shrink-0">
              <Link
                href={`/admin/productos/${p.id}`}
                className="border border-lightGray p-2 text-primary hover:border-primary transition-colors"
                aria-label="Editar"
              >
                <Pencil size={18} />
              </Link>
              <button
                onClick={() => setToDelete(p)}
                className="border border-lightGray p-2 text-red-600 hover:border-red-600 transition-colors cursor-pointer"
                aria-label="Eliminar"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar producto"
        message={
          <>
            ¿Seguro que querés eliminar <strong>{toDelete?.name}</strong>? Esta
            acción no se puede deshacer.
          </>
        }
        pending={pending}
        onConfirm={confirmDelete}
        onCancel={() => !pending && setToDelete(null)}
      />
    </>
  );
}
