import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import EventForm from "@/components/EventForm";
import PageHeader from "@/components/PageHeader";
import { ApiError, publicFetch, type EventItem } from "@/lib/api";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Update Event" };

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  let event: EventItem;
  try {
    event = await publicFetch<EventItem>(`/events/${id}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }
  if (event.creatorEmail !== user.email) redirect("/manage-events");

  return (
    <>
      <PageHeader title="Update event" subtitle="Change anything you like and save." />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EventForm event={event} />
      </div>
    </>
  );
}
