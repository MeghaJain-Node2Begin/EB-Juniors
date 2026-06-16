import React from 'react';
import { notFound } from 'next/navigation';
import TopNavbar from "@/components/hero/TopNavbar";
import DeferredFooter from "@/components/layout/DeferredFooter";
import { fetchBlogById } from "@/lib/api";
import BlogDetailsClient from '@/components/blog/BlogDetailsClient';

export const dynamic = 'force-dynamic';

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Await params if it is a promise (Next.js 15+)
  const resolvedParams = await params;
  const blog = await fetchBlogById(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <div className="flex-grow">
        <BlogDetailsClient blog={blog} />
      </div>
      <DeferredFooter />
    </main>
  );
}
