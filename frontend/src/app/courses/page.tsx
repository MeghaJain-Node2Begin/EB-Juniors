import TopNavbar from "@/components/hero/TopNavbar";
import CoursesContent from "@/components/courses/CoursesContent";
import Footer from "@/components/footer/Footer";
import { fetchCourses } from "@/lib/api";

export const metadata = {
  title: "Coding & Computer Courses in Surat — Java, Python, Web Development",
  description: "Explore EB Juniors' coding and computer courses in Surat for Class 6–12 students. Learn Java, Python, Web Development, and more with expert mentors at City Light, Surat.",
};

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const courses = await fetchCourses();

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <CoursesContent courses={courses} />
      <Footer />
    </main>
  );
}
