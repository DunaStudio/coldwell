"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import logo from "@/public/images/LogoBlanco.svg";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/categorias", label: "Categorías" },
];

export function AdminNav({
  email,
  logout,
}: {
  email: string;
  logout: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  const content = (
    <>
      <nav className="flex flex-col gap-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 font-light transition-colors ${
              isActive(l.href)
                ? "bg-white text-primary"
                : "text-white hover:bg-white/10"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/productos"
          target="_blank"
          onClick={() => setIsOpen(false)}
          className="px-4 py-3 font-light text-white/70 hover:bg-white/10 transition-colors"
        >
          Ver catálogo ↗
        </Link>
      </nav>
      <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/20">
        <p className="text-white/70 text-sm font-light break-all">{email}</p>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 border border-white text-white px-4 py-2 text-sm hover:bg-white hover:text-primary transition-all duration-150 cursor-pointer"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-primary p-6 gap-8 sticky top-0 h-screen">
        <Link href="/admin">
          <Image src={logo} alt="Coldwell" className="w-40 h-auto" />
        </Link>
        {content}
      </aside>

      {/* Mobile */}
      <header className="lg:hidden bg-primary flex items-center justify-between px-5 py-4 sticky top-0 z-40">
        <Link href="/admin">
          <Image src={logo} alt="Coldwell" className="w-32 h-auto" />
        </Link>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="text-white p-1 cursor-pointer"
          aria-label="Abrir menú"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>
      <div
        className={`lg:hidden fixed inset-0 top-15 bg-primary flex flex-col p-6 gap-8 z-30 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {content}
      </div>
    </>
  );
}
