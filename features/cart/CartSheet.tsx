"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { cartTotal, useCart } from "./store";
import { buildWhatsAppOrderUrl } from "./whatsapp";
import { formatPrice } from "@/utils/format";

export function CartSheet() {
  const { items, isOpen, close, setQuantity, removeItem } = useCart();

  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const checkout = () => {
    const url = buildWhatsAppOrderUrl(items, window.location.origin);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed inset-0 z-300 transition-all duration-300 ${
        isOpen ? "visible" : "invisible pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />
      <aside
        role="dialog"
        aria-label="Carrito"
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-primary text-white flex items-center justify-between px-6 py-5">
          <p className="text-[22px] font-light">Tu pedido</p>
          <button
            onClick={close}
            className="p-1 hover:opacity-70 cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-secondary font-light">Tu carrito está vacío.</p>
            <Link
              href="/productos"
              onClick={close}
              className="border border-primary bg-primary text-white px-8 py-3 hover:bg-white hover:text-primary transition-all duration-150"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-lightGray">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 p-4">
                  <Link
                    href={`/productos/${item.slug}`}
                    onClick={close}
                    className="relative w-20 h-20 shrink-0 bg-lightGray"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/productos/${item.slug}`}
                        onClick={close}
                        className="text-primary leading-tight hover:underline"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-secondary hover:text-red-600 cursor-pointer shrink-0"
                        aria-label="Quitar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex border border-lightGray">
                        <button
                          onClick={() =>
                            setQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 text-primary hover:bg-lightGray cursor-pointer"
                          aria-label="Restar"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 flex items-center justify-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 text-primary hover:bg-lightGray cursor-pointer"
                          aria-label="Sumar"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-lightGray p-6 flex flex-col gap-4">
              <div className="flex justify-between text-[20px]">
                <span className="text-tertiary font-light">Total</span>
                <span className="text-primary">
                  {formatPrice(cartTotal(items))}
                </span>
              </div>
              <button
                onClick={checkout}
                className="w-full border border-primary bg-primary text-white px-8 py-4 text-[18px] hover:bg-white hover:text-primary transition-all duration-150 cursor-pointer"
              >
                Finalizar pedido por WhatsApp
              </button>
              <p className="text-secondary text-xs font-light text-center">
                Te respondemos por WhatsApp para confirmar disponibilidad y
                forma de pago.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
