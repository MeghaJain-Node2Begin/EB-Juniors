import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import DeferredFooter from "@/components/layout/DeferredFooter";
import TopNavbar from "@/components/hero/TopNavbar";

export const metadata: Metadata = {
  title: "About EB Juniors — Computer & Coding Institute in Surat",
  description:
    "Learn about EB Juniors, Surat's leading computer and coding institute for school students (Class 6–12). Our mission, teaching methodology, and student success stories at City Light, Surat, Gujarat.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <TopNavbar />
      <AboutHero />
      <MissionVision />
      <DeferredFooter />
    </main>
  );
}

