"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";
import { cartCount, useCart } from "@/features/cart/store";
import logo from "@/public/images/Logo.png";

const navLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#empresa", label: "Empresa" },
  { href: "/#productos", label: "Productos" },
  { href: "/productos", label: "Catálogo" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#contacto", label: "Contacto" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const inCatalog = pathname.startsWith("/productos");
  const count = useCart((s) => cartCount(s.items));
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  // Fuera de la home no hay hero oscuro detrás: el nav va sólido.
  const headerBg = !isHome
    ? "bg-primary"
    : scrolled
      ? "bg-gray-500/30 backdrop-blur-md"
      : "bg-transparent";

  return (
    <>
      <header
        className={`transition-colors duration-300 ${headerBg} top-0 right-0 md:left-0 md:w-full md:rounded-none text-white font-sans fixed z-200 rounded-2xl m-3 md:m-0`}
      >
        <div className="w-full max-w-350 mx-auto px-6 py-3 md:px-8 md:py-5 flex justify-end md:justify-center lg:justify-between items-center relative">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity relative z-50 hidden lg:block"
            onClick={closeMenu}
          >
            <Image
              src={logo}
              alt="Coldwell Neumáticos"
              width={200}
              height={50}
              className="w-40 md:w-50 h-auto"
            />
          </Link>

          <nav className="hidden md:flex gap-8 text-[16px] font-light">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`hover:text-gray-300 transition-colors ${
                  inCatalog && l.href === "/productos"
                    ? "underline underline-offset-8"
                    : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:absolute md:right-8 lg:static">
            <button
              onClick={() => {
                closeMenu();
                openCart();
              }}
              className="relative z-50 p-1 text-white hover:opacity-80 transition-opacity cursor-pointer"
              aria-label={`Abrir carrito (${count})`}
            >
              <ShoppingCart size={28} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-5 h-5 px-1 bg-white text-primary text-xs font-medium flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden relative z-50 p-1 text-white hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X size={32} strokeWidth={1.5} />
              ) : (
                <Menu size={32} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-[#15007E] flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden z-40 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-8 text-[24px] font-light items-center text-white">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
