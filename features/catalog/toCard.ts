import type { CatalogProduct } from "./queries";
import type { CardProduct } from "./components/CatalogProductCard";

export function toCard(p: CatalogProduct): CardProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    image: p.images[0]?.url ?? null,
    category: p.category?.name ?? null,
  };
}
