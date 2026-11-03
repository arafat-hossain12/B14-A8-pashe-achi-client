import type { Metadata } from "next";
import JoinedList from "@/components/JoinedList";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Joined Events" };

export default function JoinedEventsPage() {
  return (
    <>
      <PageHeader title="Events you joined" subtitle="Sorted by date, so the next one is always on top." />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <JoinedList />
      </div>
    </>
  );
}
