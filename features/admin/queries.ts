import "server-only";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";

export async function getAdminStats() {
  const [total, active, featured, cats] = await Promise.all([
    db.$count(products),
    db.$count(products, eq(products.isActive, true)),
    db.$count(products, eq(products.isFeatured, true)),
    db.$count(categories),
  ]);
  return { total, active, featured, categories: cats };
}

export function getAdminProducts() {
  return db.query.products.findMany({
    orderBy: [desc(products.updatedAt)],
    with: {
      category: true,
      images: { orderBy: [asc(productImages.position)], limit: 1 },
    },
  });
}

export function getAdminProduct(id: string) {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: { images: { orderBy: [asc(productImages.position)] } },
  });
}

export async function getAdminCategories() {
  const rows = await db.query.categories.findMany({
    orderBy: [asc(categories.position), asc(categories.name)],
    with: { products: { columns: { id: true } } },
  });
  return rows.map(({ products, ...c }) => ({
    ...c,
    productCount: products.length,
  }));
}
