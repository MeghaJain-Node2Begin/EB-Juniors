import TopNavbar from "@/components/hero/TopNavbar";
import Footer from "@/components/footer/Footer";
import BlogContent from "@/components/blog/BlogContent";
import { fetchBlogs } from "@/lib/api";

export const metadata = {
  title: "Blog & Insights | Extrabits Junior",
  description: "Read the latest articles, insights, and news from Extrabits Junior.",
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <BlogContent blogs={blogs} />
      <Footer />
    </main>
  );
}
