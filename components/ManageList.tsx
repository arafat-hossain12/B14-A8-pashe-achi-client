"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ApiError, authFetch, type EventItem } from "@/lib/api";
import { formatDate, isPast } from "@/lib/format";
import { ListSkeleton } from "./Skeletons";

export default function ManageList() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");
  const [target, setTarget] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    authFetch<EventItem[]>("/my-events")
      .then(setEvents)
      .catch((e) => setError(e instanceof ApiError ? e.message : "Could not load your events"));
  }, []);

  async function remove() {
    if (!target) return;
    setDeleting(true);
    try {
      await authFetch(`/events/${target._id}`, { method: "DELETE" });
      setEvents((list) => (list ? list.filter((e) => e._id !== target._id) : list));
      toast.success("Event deleted");
      setTarget(null);
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Could not delete the event");
    } finally {
      setDeleting(false);
    }
  }

  if (error) return <div role="alert" className="alert alert-error alert-soft">{error}</div>;
  if (!events) return <ListSkeleton />;
  if (events.length === 0)
    return (
      <div className="rounded-box border border-dashed border-base-300 py-16 text-center">
        <p className="text-lg font-semibold">You have not created any events yet</p>
        <Link href="/create-event" className="btn btn-primary mt-4">Create your first event</Link>
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        {events.map((e) => (
          <div key={e._id} className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-4 sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={e.thumbnail} alt={e.title} className="h-32 w-full rounded-xl object-cover sm:h-24 sm:w-36" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-lg font-bold">{e.title}</h3>
                {isPast(e.eventDate) && <span className="badge badge-ghost">Ended</span>}
              </div>
              <p className="text-sm text-base-content/70">{e.location} · {formatDate(e.eventDate)}</p>
              <p className="text-sm text-base-content/70">{e.eventType} · {e.joinCount} joined</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/manage-events/${e._id}/edit`} className="btn btn-outline btn-primary btn-sm">Update</Link>
              <button onClick={() => setTarget(e)} className="btn btn-outline btn-error btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <dialog className={`modal ${target ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Delete this event?</h3>
          <p className="py-3 text-base-content/70">
            “{target?.title}” and all volunteer sign-ups for it will be removed. This cannot be undone.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => setTarget(null)} disabled={deleting}>Cancel</button>
            <button className="btn btn-error" onClick={remove} disabled={deleting}>
              {deleting ? <span className="loading loading-spinner loading-sm" /> : "Yes, delete"}
            </button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={() => !deleting && setTarget(null)} />
      </dialog>
    </>
  );
}
