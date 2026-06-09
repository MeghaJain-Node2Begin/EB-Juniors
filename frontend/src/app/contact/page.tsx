import React from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactMap from "@/components/contact/ContactMap";
import ContactFaq from "@/components/contact/ContactFaq";
import Footer from "@/components/footer/Footer";
import TopNavbar from "@/components/hero/TopNavbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <TopNavbar />
      <ContactHero />
      <ContactSection />
      <ContactMap />
      <ContactFaq />
      <Footer />
    </main>
  );
}
