import TopNavbar from "@/components/hero/TopNavbar";
import DeferredFooter from "@/components/layout/DeferredFooter";
import EventsContent from "@/components/events/EventsContent";
import { fetchEvents } from "@/lib/api";

export const metadata = {
  title: "Events & Workshops — EB Juniors Surat",
  description: "Explore upcoming coding workshops, tech events, and competitions at EB Juniors in Surat. Join our community of young learners and innovators.",
};

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <EventsContent events={events} />
      <DeferredFooter />
    </main>
  );
}
