"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/public/images/Logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 text-white font-sans">
      <div className="w-full max-w-350 mx-auto px-6 py-6 md:px-8 md:py-8 flex justify-end md:justify-center lg:justify-between items-center relative">
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
          <Link
            href="#inicio"
            className="hover:text-gray-300 transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="#empresa"
            className="hover:text-gray-300 transition-colors"
          >
            Empresa
          </Link>
          <Link
            href="#productos"
            className="hover:text-gray-300 transition-colors"
          >
            Productos
          </Link>
          <Link
            href="#servicios"
            className="hover:text-gray-300 transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="#contacto"
            className="hover:text-gray-300 transition-colors"
          >
            Contacto
          </Link>
        </nav>

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

        <div
          className={`fixed inset-0 bg-[#15007E] flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden z-40 ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col gap-8 text-[24px] font-light items-center text-white">
            <Link
              href="#inicio"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link
              href="#empresa"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Empresa
            </Link>
            <Link
              href="#productos"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Productos
            </Link>
            <Link
              href="#servicios"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Servicios
            </Link>
            <Link
              href="#contacto"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
