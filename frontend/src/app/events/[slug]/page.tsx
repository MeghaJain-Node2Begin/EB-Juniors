import React from 'react';
import { notFound } from 'next/navigation';
import TopNavbar from "@/components/hero/TopNavbar";
import DeferredFooter from "@/components/layout/DeferredFooter";
import { fetchEventBySlug } from "@/lib/api";
import EventDetailsClient from '@/components/events/EventDetailsClient';

export const dynamic = 'force-dynamic';

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Await params if it is a promise (Next.js 15+)
  const resolvedParams = await params;
  const event = await fetchEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <div className="flex-grow">
        <EventDetailsClient event={event} />
      </div>
      <DeferredFooter />
    </main>
  );
}
