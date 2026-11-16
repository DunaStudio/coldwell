import "server-only";
import { cache } from "react";
import { and, asc, desc, eq, isNotNull, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";

export type CatalogProduct = Awaited<
  ReturnType<typeof getActiveProducts>
>[number];

const withImagesAndCategory = {
  images: { orderBy: [asc(productImages.position)] },
  category: true,
} as {
  images: { orderBy: SQL[] };
  category: true;
};

export function getCategories() {
  return db.query.categories.findMany({
    orderBy: [asc(categories.position), asc(categories.name)],
  });
}

/** Marcas distintas entre los productos visibles, para el filtro. */
export async function getBrands() {
  const rows = await db
    .selectDistinct({ brand: products.brand })
    .from(products)
    .where(and(eq(products.isActive, true), isNotNull(products.brand)))
    .orderBy(asc(products.brand));
  return rows.map((r) => r.brand!).filter(Boolean);
}

export async function getActiveProducts(filters: {
  categorySlug?: string;
  brand?: string;
} = {}) {
  const conditions: SQL[] = [eq(products.isActive, true)];

  if (filters.categorySlug) {
    const cat = await db.query.categories.findFirst({
      where: eq(categories.slug, filters.categorySlug),
    });
    if (!cat) return [];
    conditions.push(eq(products.categoryId, cat.id));
  }

  if (filters.brand) {
    conditions.push(
      sql`lower(${products.brand}) = ${filters.brand.toLowerCase()}`,
    );
  }

  return db.query.products.findMany({
    where: and(...conditions),
    orderBy: [desc(products.createdAt)],
    with: withImagesAndCategory,
  });
}

export function getFeaturedProducts() {
  return db.query.products.findMany({
    where: and(eq(products.isActive, true), eq(products.isFeatured, true)),
    orderBy: [desc(products.updatedAt)],
    with: withImagesAndCategory,
  });
}

// cache(): generateMetadata y la página comparten la misma query por request.
export const getProductBySlug = cache((slug: string) =>
  db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
    with: withImagesAndCategory,
  }),
);
