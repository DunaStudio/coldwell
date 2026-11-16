import "server-only";
import { cache } from "react";
import { and, asc, desc, eq, type SQL } from "drizzle-orm";
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

/** Todos los productos visibles; los filtros se aplican en la página. */
export function getActiveProducts() {
  return db.query.products.findMany({
    where: eq(products.isActive, true),
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
