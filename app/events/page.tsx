import type { Metadata } from "next";
import EventsExplorer from "@/components/EventsExplorer";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Upcoming Events" };

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Upcoming events"
        subtitle="Every drive below is still open for volunteers. Search by place or filter by cause."
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <EventsExplorer />
      </div>
    </>
  );
}
