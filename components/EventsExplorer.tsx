"use client";

import { useEffect, useState } from "react";
import { EVENT_TYPES, publicFetch, type EventItem } from "@/lib/api";
import EventCard from "./EventCard";
import { GridSkeleton } from "./Skeletons";

export default function EventsExplorer() {
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [res, setRes] = useState<{ key: string; events?: EventItem[]; error?: string } | null>(null);
  const key = `${type}|${search.trim()}`;

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => {
      const q = new URLSearchParams();
      if (type !== "All") q.set("type", type);
      if (search.trim()) q.set("search", search.trim());
      publicFetch<EventItem[]>(`/events?${q}`)
        .then((events) => !cancelled && setRes({ key, events }))
        .catch(() => !cancelled && setRes({ key, error: "Could not load events. Please try again in a moment." }));
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [type, search, key]);

  const current = res?.key === key ? res : null;
  const events = current?.events ?? null;
  const error = current?.error ?? "";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or location…"
          className="input input-bordered w-full lg:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {["All", ...EVENT_TYPES].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`btn btn-sm ${type === t ? "btn-primary" : "btn-outline"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div role="alert" className="alert alert-error alert-soft">{error}</div>
      ) : events === null ? (
        <GridSkeleton />
      ) : events.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 py-16 text-center">
          <p className="text-lg font-semibold">No upcoming events match your search</p>
          <p className="mt-1 text-base-content/70">Try a different filter, or host one yourself.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e._id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
