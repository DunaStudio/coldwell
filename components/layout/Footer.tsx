import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white font-sans">
      <div className="w-full max-w-350 mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/LogoBlanco.svg"
                alt="Coldwell Neumáticos"
                width={202}
                height={44}
                className="w-50.5 h-auto"
              />
            </Link>
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-[#15007E] transition-colors"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-[#15007E] transition-colors"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <nav className="flex flex-row md:flex-col justify-center flex-wrap gap-x-4 gap-y-2 text-[14px] md:text-[16px] font-light">
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

          <div className="flex flex-col items-center md:items-end gap-4 text-[14px] md:text-[16px] font-light text-center md:text-right">
            <p>
              Lun. a Vie. 08:00 - 13:00 y 17:00 - 21:00 | Sáb. 08:00 - 21:00
            </p>
            <p>Av. Mendoza 4287 Sur, esquina Boulevard Sarmiento</p>
            <p>neumaticoscoldwell@gmail.com</p>
            <p>2646252213</p>
          </div>
        </div>
      </div>

      <div className="bg-white py-5 flex items-center justify-center w-full px-4 text-center">
        <p className="text-[12px] md:text-[16px] text-secondary font-light flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
          <span>
            © {new Date().getFullYear()} Todos los derechos reservados
          </span>
          <span className="text-[#2000C3]">/</span>
          <span>
            Desarrollado por{" "}
            <a
              href="https://www.instagram.com/dunastudiosj/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#15007E] font-semibold tracking-wider hover:text-[#C8643E] transition-colors duration-300"
            >
              Duna Studio
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};
