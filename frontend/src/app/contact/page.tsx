import type { Metadata } from "next";
import React from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactMap from "@/components/contact/ContactMap";
import ContactFaq from "@/components/contact/ContactFaq";
import DeferredFooter from "@/components/layout/DeferredFooter";
import TopNavbar from "@/components/hero/TopNavbar";

export const metadata: Metadata = {
  title: "Contact EB Juniors — Computer Classes in City Light, Surat",
  description:
    "Get in touch with EB Juniors at F-21, Agresen Point, City Light, Surat. Call +91 95109 90292 to enroll in Java, Python, Web Development & Computer classes for Class 6–12 students.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <TopNavbar />
      <ContactHero />
      <ContactSection />
      <ContactMap />
      <ContactFaq />
      <DeferredFooter />
    </main>
  );
}

