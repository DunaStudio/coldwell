"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";
import { requireAdmin } from "@/auth";
import { slugify } from "@/utils/format";

export type ActionResult = { ok: true } | { ok: false; error: string };

// En producción Next oculta el mensaje de los errores lanzados en server
// actions, así que devolvemos el error como dato en vez de hacer throw.
function fail(error: string): ActionResult {
  return { ok: false, error };
}

function firstIssue(err: z.ZodError) {
  return err.issues[0]?.message ?? "Datos inválidos";
}

function isUniqueViolation(err: unknown) {
  const e = err as { code?: string; cause?: { code?: string } };
  return e?.code === "23505" || e?.cause?.code === "23505";
}

async function guard(): Promise<ActionResult | null> {
  try {
    await requireAdmin();
    return null;
  } catch {
    return fail("No autorizado");
  }
}

function revalidateCatalog() {
  revalidatePath("/productos", "layout");
  revalidatePath("/admin", "layout");
}

// ─── Productos ─────────────────────────────────────────────

const productSchema = z
  .object({
    name: z.string().trim().min(1, "El nombre es obligatorio"),
    slug: z.string().trim().optional(),
    description: z.string().trim().optional(),
    price: z.coerce
      .number({ message: "El precio debe ser un número" })
      .int("El precio debe ser un número entero")
      .min(0, "El precio no puede ser negativo"),
    compareAtPrice: z.coerce
      .number({ message: "El precio anterior debe ser un número" })
      .int("El precio anterior debe ser un número entero")
      .positive("El precio anterior debe ser mayor a 0")
      .nullable()
      .optional(),
    categoryId: z.string().uuid().nullable().optional(),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
    images: z
      .array(
        z.object({
          url: z.string().url("URL de imagen inválida"),
          alt: z.string().optional(),
        }),
      )
      .max(12, "Máximo 12 imágenes por producto"),
  })
  .refine(
    (d) => d.compareAtPrice == null || d.compareAtPrice > d.price,
    "El precio anterior debe ser mayor al precio actual",
  );

export type ProductInput = z.input<typeof productSchema>;

export async function saveProduct(
  id: string | null,
  input: ProductInput,
): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return fail(firstIssue(parsed.error));
  const d = parsed.data;

  const slug = slugify(d.slug || d.name);
  if (!slug) return fail("El slug no es válido");

  const values = {
    name: d.name,
    slug,
    description: d.description || null,
    price: d.price,
    compareAtPrice: d.compareAtPrice ?? null,
    categoryId: d.categoryId ?? null,
    isActive: d.isActive,
    isFeatured: d.isFeatured,
  };

  const productId = id ?? crypto.randomUUID();
  const imageRows = d.images.map((img, position) => ({
    productId,
    url: img.url,
    alt: img.alt || d.name,
    position,
  }));

  try {
    // db.batch corre todo en una sola transacción (Neon HTTP).
    if (id) {
      const exists = await db.query.products.findFirst({
        where: eq(products.id, id),
        columns: { id: true },
      });
      if (!exists) return fail("El producto no existe");

      const update = db.update(products).set(values).where(eq(products.id, id));
      const clear = db
        .delete(productImages)
        .where(eq(productImages.productId, id));
      if (imageRows.length) {
        await db.batch([
          update,
          clear,
          db.insert(productImages).values(imageRows),
        ]);
      } else {
        await db.batch([update, clear]);
      }
    } else {
      const insert = db.insert(products).values({ id: productId, ...values });
      if (imageRows.length) {
        await db.batch([insert, db.insert(productImages).values(imageRows)]);
      } else {
        await insert;
      }
    }
  } catch (err) {
    if (isUniqueViolation(err)) {
      return fail("Ya existe un producto con ese slug");
    }
    console.error(err);
    return fail("No se pudo guardar el producto");
  }

  revalidateCatalog();
  return { ok: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  try {
    await db.delete(products).where(eq(products.id, id));
  } catch (err) {
    console.error(err);
    return fail("No se pudo eliminar el producto");
  }

  revalidateCatalog();
  return { ok: true };
}

// ─── Categorías ────────────────────────────────────────────

const categorySchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  description: z.string().trim().optional(),
});

export async function saveCategory(
  id: string | null,
  input: z.input<typeof categorySchema>,
): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return fail(firstIssue(parsed.error));

  const values = {
    name: parsed.data.name,
    slug: slugify(parsed.data.name),
    description: parsed.data.description || null,
  };
  if (!values.slug) return fail("El nombre no es válido");

  try {
    if (id) {
      await db.update(categories).set(values).where(eq(categories.id, id));
    } else {
      const count = await db.$count(categories);
      await db.insert(categories).values({ ...values, position: count });
    }
  } catch (err) {
    if (isUniqueViolation(err)) {
      return fail("Ya existe una categoría con ese nombre");
    }
    console.error(err);
    return fail("No se pudo guardar la categoría");
  }

  revalidateCatalog();
  return { ok: true };
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  try {
    // Los productos de esta categoría quedan "sin categoría" (on delete set null).
    await db.delete(categories).where(eq(categories.id, id));
  } catch (err) {
    console.error(err);
    return fail("No se pudo eliminar la categoría");
  }

  revalidateCatalog();
  return { ok: true };
}
