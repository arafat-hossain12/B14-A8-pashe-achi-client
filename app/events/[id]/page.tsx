import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, publicFetch, type EventItem } from "@/lib/api";
import { formatDate, isPast } from "@/lib/format";
import { getSession } from "@/lib/session";
import JoinButton from "@/components/JoinButton";

async function load(id: string) {
  try {
    return await publicFetch<EventItem>(`/events/${id}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = await load(id).catch(() => null);
  return { title: event ? event.title : "Event" };
}

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await load(id);
  if (!event) notFound();
  const session = await getSession();
  const ended = isPast(event.eventDate);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/events" className="link text-sm">← Back to upcoming events</Link>

      <div className="mt-5 overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnail} alt={event.title} className="h-64 w-full object-cover sm:h-96" />
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_280px]">
          <div>
            <span className="badge badge-secondary">{event.eventType}</span>
            <h1 className="section-title mt-3">{event.title}</h1>
            <p className="mt-5 whitespace-pre-line leading-relaxed text-base-content/80">{event.description}</p>
          </div>

          <aside className="space-y-4 rounded-box bg-base-200/70 p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/60">When</p>
              <p className="font-semibold">{formatDate(event.eventDate)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/60">Where</p>
              <p className="font-semibold">{event.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/60">Hosted by</p>
              <p className="font-semibold">{event.creatorName || event.creatorEmail}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/60">Volunteers</p>
              <p className="font-semibold">{event.joinCount} joined</p>
            </div>
            <JoinButton
              eventId={event._id}
              loggedIn={Boolean(session)}
              isOwner={session?.user.email === event.creatorEmail}
              ended={ended}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
