import "server-only";
import { cache } from "react";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";

export type CatalogProduct = Awaited<
  ReturnType<typeof getActiveProducts>
>[number];

export function getCategories() {
  return db.query.categories.findMany({
    orderBy: [asc(categories.position), asc(categories.name)],
  });
}

export async function getActiveProducts(categorySlug?: string) {
  let categoryId: string | undefined;
  if (categorySlug) {
    const cat = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });
    if (!cat) return [];
    categoryId = cat.id;
  }

  return db.query.products.findMany({
    where: categoryId
      ? and(eq(products.isActive, true), eq(products.categoryId, categoryId))
      : eq(products.isActive, true),
    orderBy: [desc(products.createdAt)],
    with: {
      images: { orderBy: [asc(productImages.position)] },
      category: true,
    },
  });
}

export function getFeaturedProducts() {
  return db.query.products.findMany({
    where: and(eq(products.isActive, true), eq(products.isFeatured, true)),
    orderBy: [desc(products.updatedAt)],
    with: {
      images: { orderBy: [asc(productImages.position)] },
      category: true,
    },
  });
}

// cache(): generateMetadata y la página comparten la misma query por request.
export const getProductBySlug = cache((slug: string) =>
  db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
    with: {
      images: { orderBy: [asc(productImages.position)] },
      category: true,
    },
  }),
);
