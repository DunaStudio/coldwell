import CompanySection from "@/sections/CompanySection";
import { HeroSection } from "@/sections/HeroSection";
import ProductsSection from "@/sections/ProductsSection";
import ServicesSection from "@/sections/ServicesSection";
import BrandsSection from "@/sections/BrandsSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white max-w-screen overflow-hidden">
      <HeroSection />
      <CompanySection />
      <ProductsSection />
      <ServicesSection />
      <BrandsSection />
      <ContactSection />
    </main>
  );
}
