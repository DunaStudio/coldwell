"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, ImagePlus, X } from "lucide-react";
import { saveProduct } from "@/features/admin/actions";
import { uploadToCloudinary } from "@/features/admin/lib/cloudinary";
import { slugify } from "@/utils/format";

type Category = { id: string; name: string };

export type ProductFormValues = {
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string;
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  images: { url: string; alt: string }[];
};

const empty: ProductFormValues = {
  name: "",
  slug: "",
  description: "",
  price: "",
  compareAtPrice: "",
  categoryId: "",
  isActive: true,
  isFeatured: false,
  images: [],
};

const inputClass =
  "w-full border border-lightGray bg-white px-4 py-3 font-light outline-none focus:border-primary transition-colors";
const labelClass = "text-sm text-tertiary";

export function ProductForm({
  id = null,
  initial,
  categories,
}: {
  id?: string | null;
  initial?: ProductFormValues;
  categories: Category[];
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>(initial ?? empty);
  // Mientras el slug no se edite a mano, se autogenera desde el nombre.
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(0);
  const [pending, startTransition] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) => setValues((v) => ({ ...v, [key]: value }));

  const onName = (name: string) =>
    setValues((v) => ({
      ...v,
      name,
      slug: slugTouched ? v.slug : slugify(name),
    }));

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setError(null);
    const list = Array.from(files);
    setUploading((n) => n + list.length);
    await Promise.all(
      list.map(async (file) => {
        try {
          if (!file.type.startsWith("image/")) {
            throw new Error(`${file.name} no es una imagen`);
          }
          if (file.size > 10 * 1024 * 1024) {
            throw new Error(`${file.name} pesa más de 10 MB`);
          }
          const url = await uploadToCloudinary(file);
          setValues((v) => ({ ...v, images: [...v.images, { url, alt: "" }] }));
        } catch (e) {
          setError(e instanceof Error ? e.message : "Error al subir imagen");
        } finally {
          setUploading((n) => n - 1);
        }
      }),
    );
    if (fileInput.current) fileInput.current.value = "";
  };

  const moveImage = (from: number, to: number) =>
    setValues((v) => {
      if (to < 0 || to >= v.images.length) return v;
      const images = [...v.images];
      const [item] = images.splice(from, 1);
      images.splice(to, 0, item);
      return { ...v, images };
    });

  const removeImage = (index: number) =>
    setValues((v) => ({
      ...v,
      images: v.images.filter((_, i) => i !== index),
    }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await saveProduct(id, {
        name: values.name,
        slug: values.slug,
        description: values.description,
        price: values.price === "" ? Number.NaN : Number(values.price),
        compareAtPrice:
          values.compareAtPrice === "" ? null : Number(values.compareAtPrice),
        categoryId: values.categoryId || null,
        isActive: values.isActive,
        isFeatured: values.isFeatured,
        images: values.images,
      });
      if (!res.ok) {
        setError(res.error);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      router.push("/admin/productos");
      router.refresh();
    });
  };

  const busy = pending || uploading > 0;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-3xl">
      {error && (
        <p className="border border-red-600 text-red-600 bg-white px-4 py-3">
          {error}
        </p>
      )}

      <section className="bg-white border border-lightGray p-5 md:p-6 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Nombre *</span>
          <input
            className={inputClass}
            value={values.name}
            onChange={(e) => onName(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>
            Slug (URL: /productos/{values.slug || "…"})
          </span>
          <input
            className={inputClass}
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value);
            }}
            onBlur={() => set("slug", slugify(values.slug))}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Descripción</span>
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Precio (ARS) *</span>
            <input
              className={inputClass}
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              value={values.price}
              onChange={(e) => set("price", e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Precio anterior (opcional, se muestra tachado)
            </span>
            <input
              className={inputClass}
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              value={values.compareAtPrice}
              onChange={(e) => set("compareAtPrice", e.target.value)}
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Categoría</span>
          <select
            className={`${inputClass} cursor-pointer`}
            value={values.categoryId}
            onChange={(e) => set("categoryId", e.target.value)}
          >
            <option value="">Sin categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 accent-primary"
              checked={values.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
            />
            <span className="font-light">Visible en el catálogo</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 accent-primary"
              checked={values.isFeatured}
              onChange={(e) => set("isFeatured", e.target.checked)}
            />
            <span className="font-light">Destacado (carrusel)</span>
          </label>
        </div>
      </section>

      <section className="bg-white border border-lightGray p-5 md:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-primary text-[20px]">Imágenes</h2>
            <p className="text-secondary text-sm font-light">
              La primera es la portada.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={uploading > 0}
            className="flex items-center gap-2 border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            <ImagePlus size={18} />
            {uploading > 0 ? `Subiendo (${uploading})…` : "Subir imágenes"}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => onFiles(e.target.files)}
          />
        </div>

        {values.images.length === 0 ? (
          <p className="text-secondary font-light text-sm border border-dashed border-lightGray p-6 text-center">
            Sin imágenes todavía.
          </p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {values.images.map((img, i) => (
              <li key={img.url} className="border border-lightGray">
                <div className="relative aspect-square bg-lightGray">
                  <Image
                    src={img.url}
                    alt={img.alt || values.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute top-0 left-0 bg-primary text-white text-xs px-2 py-1">
                      Portada
                    </span>
                  )}
                </div>
                <div className="flex justify-between p-1">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveImage(i, i - 1)}
                      disabled={i === 0}
                      className="p-1.5 text-primary hover:bg-lightGray disabled:opacity-30 cursor-pointer"
                      aria-label="Mover antes"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(i, i + 1)}
                      disabled={i === values.images.length - 1}
                      className="p-1.5 text-primary hover:bg-lightGray disabled:opacity-30 cursor-pointer"
                      aria-label="Mover después"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="p-1.5 text-red-600 hover:bg-lightGray cursor-pointer"
                    aria-label="Quitar imagen"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="border border-primary bg-primary text-white px-8 py-3 hover:bg-white hover:text-primary transition-all duration-150 cursor-pointer disabled:opacity-50"
        >
          {pending ? "Guardando…" : id ? "Guardar cambios" : "Crear producto"}
        </button>
        <Link
          href="/admin/productos"
          className="border border-lightGray bg-white px-8 py-3 hover:border-primary transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
