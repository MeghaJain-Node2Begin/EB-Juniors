import TopNavbar from "@/components/hero/TopNavbar";
import CoursesContent from "@/components/courses/CoursesContent";
import Footer from "@/components/footer/Footer";
import { fetchCourses } from "@/lib/api";

export const metadata = {
  title: "Courses | Extrabits Junior",
  description: "Explore our premium coding, robotics, and IT courses designed for young minds.",
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
