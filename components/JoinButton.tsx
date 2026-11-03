"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ApiError, authFetch } from "@/lib/api";

export default function JoinButton({
  eventId,
  loggedIn,
  isOwner,
  ended,
}: {
  eventId: string;
  loggedIn: boolean;
  isOwner: boolean;
  ended: boolean;
}) {
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [checking, setChecking] = useState(loggedIn);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loggedIn) return;
    authFetch<{ joined: boolean }>(`/events/${eventId}/joined`)
      .then((d) => setJoined(d.joined))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [eventId, loggedIn]);

  async function join() {
    if (!loggedIn) {
      toast.error("Please log in to join this event");
      router.push("/login");
      return;
    }
    setBusy(true);
    try {
      await authFetch(`/events/${eventId}/join`, { method: "POST" });
      setJoined(true);
      toast.success("You have joined this event. Thank you for showing up!");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Could not join the event");
    } finally {
      setBusy(false);
    }
  }

  if (ended) return <button className="btn btn-disabled w-full sm:w-auto">This event has ended</button>;
  if (isOwner) return <span className="badge badge-lg badge-soft badge-primary">You are hosting this event</span>;
  if (joined) return <button className="btn btn-success btn-soft w-full sm:w-auto" disabled>✓ You have joined</button>;

  return (
    <button onClick={join} disabled={busy || checking} className="btn btn-primary w-full sm:w-auto">
      {busy ? <span className="loading loading-spinner loading-sm" /> : "Join Event"}
    </button>
  );
}
