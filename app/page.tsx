import { HeroSection } from "@/sections/HeroSection";
import ProductsSection from "@/sections/ProductsSection";
import ServicesSection from "@/sections/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white max-w-screen overflow-hidden">
      <HeroSection />
      <ProductsSection />
      <ServicesSection />
    </main>
  );
}
