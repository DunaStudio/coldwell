export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ars = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return ars.format(value);
}

/** Datos de oferta a partir del precio y el "precio anterior". */
export function getSale(price: number, compareAtPrice: number | null) {
  if (compareAtPrice == null || compareAtPrice <= price) return null;
  return {
    discount: Math.round((1 - price / compareAtPrice) * 100),
    savings: compareAtPrice - price,
    compareAtPrice,
  };
}
