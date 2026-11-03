import Link from "next/link";
import { publicFetch, type EventItem } from "@/lib/api";
import EventCard from "../EventCard";

export default async function UpcomingSection() {
  let events: EventItem[] = [];
  let failed = false;
  try {
    events = await publicFetch<EventItem[]>("/events?limit=6");
  } catch {
    failed = true;
  }

  return (
    <section className="bg-base-200/60 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-title">Recent upcoming events</h2>
            <p className="section-sub mt-3">The next drives happening near you – pick one and show up.</p>
          </div>
          <Link href="/events" className="btn btn-outline btn-primary">See all events</Link>
        </div>

        {failed ? (
          <div role="alert" className="alert alert-warning alert-soft">
            Events are taking a moment to load. Please refresh in a few seconds.
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-box border border-dashed border-base-300 py-14 text-center">
            <p className="text-lg font-semibold">No upcoming events yet</p>
            <p className="mt-1 text-base-content/70">Be the first to host one in your area.</p>
            <Link href="/create-event" className="btn btn-primary mt-5">Create Event</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e._id} event={e} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
