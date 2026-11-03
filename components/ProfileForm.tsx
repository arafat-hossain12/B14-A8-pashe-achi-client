"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { validateUrl } from "@/lib/validators";
import Avatar from "./Avatar";

export default function ProfileForm({ name, email, image }: { name: string; email: string; image: string | null }) {
  const router = useRouter();
  const [n, setN] = useState(name);
  const [img, setImg] = useState(image ?? "");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (n.trim().length < 2) return void toast.error("Name must be at least 2 characters");
    if (img.trim() && validateUrl(img.trim())) return void toast.error("Enter a valid photo URL");
    setBusy(true);
    const { error } = await authClient.updateUser({ name: n.trim(), image: img.trim() || undefined });
    setBusy(false);
    if (error) return void toast.error(error.message || "Could not update profile");
    toast.success("Profile updated successfully");
    router.refresh();
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-[220px_1fr]">
      <div className="flex flex-col items-center gap-3 rounded-box border border-base-300 bg-base-100 p-6 text-center">
        <Avatar src={img || null} name={n} size={96} />
        <div>
          <p className="font-bold">{n || "Your name"}</p>
          <p className="break-all text-sm text-base-content/70">{email}</p>
        </div>
      </div>
      <form onSubmit={submit} noValidate className="space-y-5 rounded-box border border-base-300 bg-base-100 p-6">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Display name</span>
          <input value={n} onChange={(e) => setN(e.target.value)} className="input input-bordered w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email (cannot be changed)</span>
          <input value={email} disabled className="input input-bordered w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Photo URL</span>
          <input value={img} onChange={(e) => setImg(e.target.value)} placeholder="https://…" className="input input-bordered w-full" />
        </label>
        <button disabled={busy} className="btn btn-primary">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
