import { formatPrice } from "@/utils/format";
import { cartTotal, type CartItem } from "./store";

export const WHATSAPP_NUMBER = "542646252213";

export function buildWhatsAppOrderUrl(items: CartItem[], siteUrl?: string) {
  const lines = items.map((i) => {
    const link = siteUrl ? `\n  ${siteUrl}/productos/${i.slug}` : "";
    return `• ${i.quantity} x ${i.name} — ${formatPrice(i.price * i.quantity)}${link}`;
  });

  const message = [
    "¡Hola Coldwell! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `*Total: ${formatPrice(cartTotal(items))}*`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
