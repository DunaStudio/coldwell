"use client";
import { ShoppingCart } from "lucide-react";
import { useCart, type CartItem } from "@/features/cart/store";

export function AddToCartButton({
  product,
  compact = false,
}: {
  product: Omit<CartItem, "quantity">;
  compact?: boolean;
}) {
  const addItem = useCart((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className={`flex items-center justify-center gap-2 border border-primary bg-primary text-white hover:bg-white hover:text-primary transition-all ease-in-out duration-150 cursor-pointer ${
        compact ? "w-full py-2.5 text-[15px] mt-2" : "px-8 py-4 text-[18px]"
      }`}
    >
      <ShoppingCart size={compact ? 16 : 20} strokeWidth={1.5} />
      Agregar al carrito
    </button>
  );
}
