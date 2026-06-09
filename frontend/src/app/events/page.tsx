import TopNavbar from "@/components/hero/TopNavbar";
import Footer from "@/components/footer/Footer";
import EventsContent from "@/components/events/EventsContent";
import { fetchEvents } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <TopNavbar />
      <EventsContent events={events} />
      <Footer />
    </main>
  );
}
