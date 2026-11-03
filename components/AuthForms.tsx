"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { validateEmail, validatePassword, validateUrl } from "@/lib/validators";

function GoogleButton() {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await authClient.signIn.social({ provider: "google", callbackURL: "/" });
      }}
      className="btn btn-outline w-full gap-3"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9a6 6 0 1 1 0-12c1.9 0 3.2.8 3.9 1.5l2.6-2.5A9.6 9.6 0 0 0 12 2.3a9.7 9.7 0 1 0 0 19.4c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.1-.2-2z" />
      </svg>
      Continue with Google
    </button>
  );
}

function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="hero-bg">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-box border border-base-300 bg-base-100 p-7 shadow-xl sm:p-9">
          <h1 className="section-title">{title}</h1>
          <p className="mb-6 mt-2 text-base-content/70">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = {
      email: validateEmail(email) ?? undefined,
      password: password ? undefined : "Password is required",
    };
    setErrors(found);
    if (found.email || found.password) return void toast.error((found.email || found.password) as string);

    setBusy(true);
    const { error } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (error) return void toast.error(error.message || "Invalid email or password");
    toast.success("Welcome back! Logged in successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <Shell title="Welcome back" subtitle="Log in to create and join community events.">
      <form onSubmit={submit} noValidate className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`} />
          {errors.email && <span className="mt-1 block text-sm text-error">{errors.email}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`} />
          {errors.password && <span className="mt-1 block text-sm text-error">{errors.password}</span>}
        </label>
        <button disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Login"}
        </button>
      </form>
      <div className="divider text-xs">OR</div>
      <GoogleButton />
      <p className="mt-6 text-center text-sm">
        New to Pashe Achi?{" "}
        <Link href="/register" className="link link-primary font-semibold">Create an account</Link>
      </p>
    </Shell>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [v, setV] = useState({ name: "", email: "", photo: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = {
      name: v.name.trim().length < 2 ? "Name must be at least 2 characters" : undefined,
      email: validateEmail(v.email) ?? undefined,
      photo: validateUrl(v.photo.trim()) ?? undefined,
      password: validatePassword(v.password) ?? undefined,
    };
    setErrors(found);
    const first = Object.values(found).find(Boolean);
    if (first) return void toast.error(first);

    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: v.name.trim(),
      email: v.email,
      password: v.password,
      image: v.photo.trim(),
    });
    setBusy(false);
    if (error) return void toast.error(error.message || "Could not create your account");
    toast.success("Account created successfully. Welcome to Pashe Achi!");
    router.push("/");
    router.refresh();
  }

  const cls = (k: string) => `input input-bordered w-full ${errors[k] ? "input-error" : ""}`;

  return (
    <Shell title="Join Pashe Achi" subtitle="Create an account and start serving your community.">
      <form onSubmit={submit} noValidate className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Full name</span>
          <input value={v.name} onChange={set("name")} placeholder="Your name" className={cls("name")} />
          {errors.name && <span className="mt-1 block text-sm text-error">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input type="email" value={v.email} onChange={set("email")} placeholder="you@example.com" className={cls("email")} />
          {errors.email && <span className="mt-1 block text-sm text-error">{errors.email}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Photo URL</span>
          <input value={v.photo} onChange={set("photo")} placeholder="https://…" className={cls("photo")} />
          {errors.photo && <span className="mt-1 block text-sm text-error">{errors.photo}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <input type="password" value={v.password} onChange={set("password")} placeholder="Min 6 chars, upper & lower case" className={cls("password")} />
          {errors.password && <span className="mt-1 block text-sm text-error">{errors.password}</span>}
        </label>
        <button disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Register"}
        </button>
      </form>
      <div className="divider text-xs">OR</div>
      <GoogleButton />
      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="link link-primary font-semibold">Login</Link>
      </p>
    </Shell>
  );
}
