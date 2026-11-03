"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiError, authFetch, type JoinItem } from "@/lib/api";
import { formatDate, isPast } from "@/lib/format";
import { ListSkeleton } from "./Skeletons";

export default function JoinedList() {
  const [items, setItems] = useState<JoinItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch<JoinItem[]>("/joined")
      .then(setItems)
      .catch((e) => setError(e instanceof ApiError ? e.message : "Could not load joined events"));
  }, []);

  if (error) return <div role="alert" className="alert alert-error alert-soft">{error}</div>;
  if (!items) return <ListSkeleton />;
  if (items.length === 0)
    return (
      <div className="rounded-box border border-dashed border-base-300 py-16 text-center">
        <p className="text-lg font-semibold">You have not joined any events yet</p>
        <Link href="/events" className="btn btn-primary mt-4">Browse upcoming events</Link>
      </div>
    );

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((j) => (
        <div key={j._id} className="flex gap-4 rounded-box border border-base-300 bg-base-100 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={j.event.thumbnail} alt={j.event.title} className="h-28 w-28 shrink-0 rounded-xl object-cover" />
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-secondary badge-sm">{j.event.eventType}</span>
              {isPast(j.event.eventDate) && <span className="badge badge-ghost badge-sm">Ended</span>}
            </div>
            <h3 className="mt-1 line-clamp-2 font-bold">{j.event.title}</h3>
            <p className="text-sm text-base-content/70">{j.event.location}</p>
            <p className="text-sm text-base-content/70">{formatDate(j.event.eventDate)}</p>
            <Link href={`/events/${j.eventId}`} className="link link-primary mt-auto pt-2 text-sm">View event</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
