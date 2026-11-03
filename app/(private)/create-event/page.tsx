import type { Metadata } from "next";
import EventForm from "@/components/EventForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <>
      <PageHeader title="Create an event" subtitle="Tell volunteers what, where and when. You can edit it later." />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EventForm />
      </div>
    </>
  );
}
