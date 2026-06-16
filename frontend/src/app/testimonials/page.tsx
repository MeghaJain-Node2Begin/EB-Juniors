import TopNavbar from "@/components/hero/TopNavbar";
import DeferredFooter from "@/components/layout/DeferredFooter";
import TestimonialsContent from "@/components/testimonials/TestimonialsContent";
import { fetchTestimonials } from "@/lib/api";

export const metadata = {
  title: "Student Reviews & Testimonials — EB Juniors Surat",
  description: "Read what students and parents say about EB Juniors' computer and coding classes in Surat. Real reviews from Class 6–12 students learning Java, Python, and Web Development.",
};

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  const testimonials = await fetchTestimonials();

  // Filter approved testimonials
  const approvedTestimonials = testimonials.filter(t => t.approved === 1);

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <TestimonialsContent testimonials={approvedTestimonials} />
      <DeferredFooter />
    </main>
  );
}
