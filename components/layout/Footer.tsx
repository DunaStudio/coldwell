import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#15007E] text-white font-sans">
      <div className="w-full max-w-268 mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex flex-col gap-6">
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

          <nav className="flex flex-col gap-4 text-[16px] font-light">
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

          <div className="flex flex-col gap-4 text-[16px] font-light text-left md:text-right">
            <p>
              Lun. a Vie. 08:00 - 13:00 y 17:00 - 21:00 | Sáb. 08:00 - 21:00
            </p>
            <p>Av. Mendoza 4287 Sur, esquina Boulevard Sarmiento</p>
            <p>neumaticoscoldwell@gmail.com</p>
            <p>2646252213</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-20.5 flex items-center justify-center w-full px-4 text-center">
        <p className="text-[20px] text-[#707286] font-light flex items-center gap-3">
          © {new Date().getFullYear()} Todos los derechos reservados
          <span className="text-[#2000C3]">/</span>
          <span>
            Desarrollado por{" "}
            <span className="text-[#15007E] font-semibold">Duna Studio</span>
          </span>
        </p>
      </div>
    </footer>
  );
};
