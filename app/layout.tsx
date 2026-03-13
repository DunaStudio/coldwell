import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// Importamos tus componentes de layout (Asegurate de que las rutas coincidan con tus alias)
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Inicializamos la fuente Outfit
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coldwell Neumáticos",
  description:
    "Mucho más que neumáticos cuidamos tu camino. Venta, colocación y servicios integrales para tu vehículo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        // Aplicamos la fuente base, el antialiased para que se lea mejor y un fondo blanco por defecto
        className={`${outfit.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <Navbar />
        {/* El main envuelve el contenido específico de cada página */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
