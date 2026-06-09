import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import WhyExtrabits from "@/components/why-extrabits/WhyExtrabits";
import ClassesSection from "@/components/home/ClassesSection";
import ContactCTA from "@/components/home/ContactCTA";
import Footer from "@/components/footer/Footer";
import GlobalCursorGlow from "@/components/layout/GlobalCursorGlow";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#FDFBF7]">
      <GlobalCursorGlow />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <WhyExtrabits />
      <ClassesSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}
