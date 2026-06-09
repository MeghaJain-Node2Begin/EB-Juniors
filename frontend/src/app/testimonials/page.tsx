import TopNavbar from "@/components/hero/TopNavbar";
import Footer from "@/components/footer/Footer";
import TestimonialsContent from "@/components/testimonials/TestimonialsContent";
import { fetchTestimonials } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  const testimonials = await fetchTestimonials();

  // Filter approved testimonials
  const approvedTestimonials = testimonials.filter(t => t.approved === 1);

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <TestimonialsContent testimonials={approvedTestimonials} />
      <Footer />
    </main>
  );
}
