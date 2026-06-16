import TopNavbar from "@/components/hero/TopNavbar";
import DeferredFooter from "@/components/layout/DeferredFooter";
import BlogContent from "@/components/blog/BlogContent";
import { fetchBlogs } from "@/lib/api";

export const metadata = {
  title: "Blog — Computer & Coding Tips for Students in Surat",
  description: "Read the latest articles, coding tutorials, exam tips, and tech insights from EB Juniors — Surat's top computer institute for school students.",
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <BlogContent blogs={blogs} />
      <DeferredFooter />
    </main>
  );
}
