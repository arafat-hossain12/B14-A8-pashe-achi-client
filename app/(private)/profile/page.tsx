import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProfileForm from "@/components/ProfileForm";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <>
      <PageHeader title="My profile" subtitle="Update your name and profile picture." />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <ProfileForm name={user.name} email={user.email} image={user.image ?? null} />
      </div>
    </>
  );
}
