"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";

/**
 * Accesos rápidos para administradores mientras navegan el sitio público.
 * Consulta la sesión desde el cliente para no volver dinámicas las páginas.
 */
export function AdminQuickBar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (!cancelled && s?.user?.role === "admin") setIsAdmin(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 flex shadow-lg text-[14px]">
      <Link
        href="/admin"
        className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 border border-primary hover:bg-white hover:text-primary transition-colors"
      >
        <LayoutDashboard size={16} /> Ir al panel
      </Link>
      <button
        type="button"
        onClick={() => signOut({ redirectTo: "/" })}
        className="flex items-center gap-2 bg-white text-primary px-3 py-2.5 border border-primary border-l-0 hover:bg-lightGray transition-colors cursor-pointer"
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Salir</span>
      </button>
    </div>
  );
}
