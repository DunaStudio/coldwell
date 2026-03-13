import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50 text-white font-sans">
      <div className="w-full max-w-268 mx-auto px-8 py-8 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/Logo.png"
            alt="Coldwell Neumáticos"
            width={200}
            height={50}
            className="w-50 h-auto"
          />
        </Link>

        <nav className="hidden md:flex gap-8 text-[20px] font-light">
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
      </div>
    </header>
  );
};
