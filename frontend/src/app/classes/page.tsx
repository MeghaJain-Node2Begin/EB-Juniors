import TopNavbar from "@/components/hero/TopNavbar";
import ClassesContent from "@/components/classes/ClassesContent";
import Footer from "@/components/footer/Footer";
import { fetchClasses } from "@/lib/api";

export const metadata = {
  title: "Computer Classes in Surat for Class 6–12 Students",
  description: "Join EB Juniors' computer and IT classes in Surat designed for school students from Class 6 to 12. Expert coaching, practical learning, and exam-focused preparation at City Light, Surat.",
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
