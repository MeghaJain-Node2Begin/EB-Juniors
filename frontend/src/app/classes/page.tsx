import TopNavbar from "@/components/hero/TopNavbar";
import ClassesContent from "@/components/classes/ClassesContent";
import Footer from "@/components/footer/Footer";
import { fetchClasses } from "@/lib/api";

export const metadata = {
  title: "Classes | Extrabits Junior",
  description: "Explore our premium coding and IT classes for grades 8th to 12th.",
};

export const dynamic = 'force-dynamic';

export default async function ClassesPage() {
  const classes = await fetchClasses();

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <ClassesContent classes={classes} />
      <Footer />
    </main>
  );
}
