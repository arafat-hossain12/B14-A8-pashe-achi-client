"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ApiError, authFetch, EVENT_TYPES, type EventItem } from "@/lib/api";
import { nowLocalInput, toLocalInput } from "@/lib/format";
import { validateEventForm, type EventFormValues } from "@/lib/validators";

export default function EventForm({ event }: { event?: EventItem }) {
  const router = useRouter();
  const editing = Boolean(event);
  const [values, setValues] = useState<EventFormValues>({
    title: event?.title ?? "",
    description: event?.description ?? "",
    eventType: event?.eventType ?? "",
    thumbnail: event?.thumbnail ?? "",
    location: event?.location ?? "",
    eventDate: event ? toLocalInput(event.eventDate) : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormValues, string>>>({});
  const [busy, setBusy] = useState(false);
  const [minDate] = useState(() => nowLocalInput());

  const set = (k: keyof EventFormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setValues((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateEventForm(values);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0] as string);
      return;
    }
    setBusy(true);
    try {
      const body = JSON.stringify({ ...values, eventDate: new Date(values.eventDate).toISOString() });
      if (editing) {
        await authFetch(`/events/${event!._id}`, { method: "PUT", body });
        toast.success("Event updated successfully");
        router.push("/manage-events");
      } else {
        await authFetch("/events", { method: "POST", body });
        toast.success("Event created successfully!");
        router.push("/events");
      }
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError && err.errors) setErrors(err.errors);
      toast.error(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const field = (k: keyof EventFormValues) => (errors[k] ? "input-error select-error textarea-error" : "");

  return (
    <form onSubmit={submit} noValidate className="space-y-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <label className="form-control block">
        <span className="mb-1 block text-sm font-medium">Event title</span>
        <input value={values.title} onChange={set("title")} placeholder="e.g. Winter Clothes Distribution" className={`input input-bordered w-full ${field("title")}`} />
        {errors.title && <span className="mt-1 block text-sm text-error">{errors.title}</span>}
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Event type</span>
          <select value={values.eventType} onChange={set("eventType")} className={`select select-bordered w-full ${field("eventType")}`}>
            <option value="">Select a type</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.eventType && <span className="mt-1 block text-sm text-error">{errors.eventType}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Date &amp; time</span>
          <input type="datetime-local" suppressHydrationWarning min={minDate} value={values.eventDate} onChange={set("eventDate")} className={`input input-bordered w-full ${field("eventDate")}`} />
          {errors.eventDate && <span className="mt-1 block text-sm text-error">{errors.eventDate}</span>}
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Location</span>
        <input value={values.location} onChange={set("location")} placeholder="e.g. Mirpur 10, Dhaka" className={`input input-bordered w-full ${field("location")}`} />
        {errors.location && <span className="mt-1 block text-sm text-error">{errors.location}</span>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Thumbnail image URL</span>
        <input value={values.thumbnail} onChange={set("thumbnail")} placeholder="https://…" className={`input input-bordered w-full ${field("thumbnail")}`} />
        {errors.thumbnail && <span className="mt-1 block text-sm text-error">{errors.thumbnail}</span>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Description</span>
        <textarea value={values.description} onChange={set("description")} rows={5} placeholder="What will volunteers do? What should they bring?" className={`textarea textarea-bordered w-full ${field("description")}`} />
        {errors.description && <span className="mt-1 block text-sm text-error">{errors.description}</span>}
      </label>

      <button disabled={busy} className="btn btn-primary w-full sm:w-auto sm:px-10">
        {busy ? <span className="loading loading-spinner loading-sm" /> : editing ? "Save Changes" : "Create Event"}
      </button>
    </form>
  );
}
