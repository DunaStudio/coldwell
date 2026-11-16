"use client";
import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

/** Botón "Filtrar" + panel lateral para mobile. Los filtros llegan como children. */
export function MobileFilters({
  activeCount,
  resultCount,
  children,
}: {
  activeCount: number;
  resultCount: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 border border-primary text-primary px-4 py-2.5 hover:bg-primary hover:text-white transition-all cursor-pointer"
      >
        <SlidersHorizontal size={18} strokeWidth={1.5} />
        Filtrar
        {activeCount > 0 && (
          <span className="bg-primary text-white text-xs min-w-5 h-5 px-1 flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      <div
        className={`lg:hidden fixed inset-0 z-300 transition-all duration-300 ${
          open ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          role="dialog"
          aria-label="Filtros"
          className={`absolute top-0 left-0 h-full w-full max-w-sm bg-white flex flex-col transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="bg-primary text-white flex items-center justify-between px-6 py-5">
            <p className="text-[22px] font-light">Filtros</p>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:opacity-70 cursor-pointer"
              aria-label="Cerrar filtros"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>
          {/* Al tocar un filtro (link) se cierra el panel. */}
          <div
            className="flex-1 overflow-y-auto p-6"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            {children}
          </div>
          <div className="border-t border-lightGray p-6">
            <button
              onClick={() => setOpen(false)}
              className="w-full border border-primary bg-primary text-white py-3 hover:bg-white hover:text-primary transition-all cursor-pointer"
            >
              Ver {resultCount} producto{resultCount === 1 ? "" : "s"}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
