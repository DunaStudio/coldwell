import { HeroSection } from "@/sections/HeroSection";
import ServicesSection from "@/sections/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white max-w-screen overflow-hidden">
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
