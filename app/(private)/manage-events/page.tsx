import type { Metadata } from "next";
import ManageList from "@/components/ManageList";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Manage Events" };

export default function ManageEventsPage() {
  return (
    <>
      <PageHeader title="Manage your events" subtitle="Update details or delete the events you created." />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <ManageList />
      </div>
    </>
  );
}
