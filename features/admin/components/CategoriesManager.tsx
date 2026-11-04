"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { deleteCategory, saveCategory } from "@/features/admin/actions";
import { ConfirmDialog } from "./ConfirmDialog";

type Category = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
};

const inputClass =
  "flex-1 min-w-0 border border-lightGray bg-white px-4 py-2.5 font-light outline-none focus:border-primary transition-colors";

export function CategoriesManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, after?: () => void) =>
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) {
        setError(res.error ?? "Error");
        return;
      }
      setError(null);
      after?.();
      router.refresh();
    });

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p className="border border-red-600 text-red-600 bg-white px-4 py-3">
          {error}
        </p>
      )}

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(
            () => saveCategory(null, { name: newName }),
            () => setNewName(""),
          );
        }}
      >
        <input
          className={inputClass}
          placeholder="Nueva categoría"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          type="submit"
          disabled={pending || !newName.trim()}
          className="border border-primary bg-primary text-white px-6 hover:bg-white hover:text-primary transition-all cursor-pointer disabled:opacity-50"
        >
          Agregar
        </button>
      </form>

      <div className="bg-white border border-lightGray divide-y divide-lightGray">
        {categories.length === 0 && (
          <p className="p-6 text-center text-secondary font-light">
            No hay categorías.
          </p>
        )}
        {categories.map((c) =>
          editing?.id === c.id ? (
            <form
              key={c.id}
              className="flex items-center gap-2 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                run(
                  () => saveCategory(c.id, { name: editing.name }),
                  () => setEditing(null),
                );
              }}
            >
              <input
                autoFocus
                className={inputClass}
                value={editing.name}
                onChange={(e) =>
                  setEditing({ id: c.id, name: e.target.value })
                }
              />
              <button
                type="submit"
                disabled={pending}
                className="border border-lightGray p-2 text-primary hover:border-primary cursor-pointer"
                aria-label="Guardar"
              >
                <Check size={18} />
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="border border-lightGray p-2 text-secondary hover:border-primary cursor-pointer"
                aria-label="Cancelar"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <div key={c.id} className="flex items-center gap-4 p-3 md:p-4">
              <div className="flex-1 min-w-0">
                <p className="text-primary">{c.name}</p>
                <p className="text-secondary text-sm font-light">
                  /productos?categoria={c.slug} · {c.productCount} producto
                  {c.productCount === 1 ? "" : "s"}
                </p>
              </div>
              <button
                onClick={() => setEditing({ id: c.id, name: c.name })}
                className="border border-lightGray p-2 text-primary hover:border-primary transition-colors cursor-pointer"
                aria-label="Editar"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => setToDelete(c)}
                className="border border-lightGray p-2 text-red-600 hover:border-red-600 transition-colors cursor-pointer"
                aria-label="Eliminar"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ),
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar categoría"
        message={
          <>
            ¿Eliminar <strong>{toDelete?.name}</strong>?
            {toDelete && toDelete.productCount > 0 && (
              <>
                {" "}
                Sus {toDelete.productCount} producto
                {toDelete.productCount === 1 ? "" : "s"} quedarán sin
                categoría (no se borran).
              </>
            )}
          </>
        }
        pending={pending}
        onConfirm={() => {
          if (!toDelete) return;
          const id = toDelete.id;
          setToDelete(null);
          run(() => deleteCategory(id));
        }}
        onCancel={() => !pending && setToDelete(null)}
      />
    </div>
  );
}
