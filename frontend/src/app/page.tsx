import type { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import WhyExtrabits from "@/components/why-extrabits/WhyExtrabits";
import ClassesSection from "@/components/home/ClassesSection";
import ContactCTA from "@/components/home/ContactCTA";
import Footer from "@/components/footer/Footer";
import GlobalCursorGlow from "@/components/layout/GlobalCursorGlow";
import { BreadcrumbSchema, BUSINESS } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "EB Juniors — Best Computer & Coding Classes in Surat for Class 6–12",
  description:
    "EB Juniors is Surat's top-rated computer and coding institute for school students (Class 6 to 12). Expert-led Java, Python, Web Development & IT courses at City Light, Surat, Gujarat.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#FDFBF7]">
      <BreadcrumbSchema
        items={[{ name: "Home", url: BUSINESS.url }]}
      />
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

