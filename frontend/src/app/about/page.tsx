import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import Footer from "@/components/footer/Footer";
import TopNavbar from "@/components/hero/TopNavbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <TopNavbar />
      <AboutHero />
      <MissionVision />
      <Footer />
    </main>
  );
}
