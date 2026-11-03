"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return void toast.error("Enter a valid email address");
    toast.success("Thanks for subscribing!");
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-4">
      <div className="rounded-box bg-primary px-6 py-12 text-center text-primary-content sm:px-12">
        <h2 className="section-title">Get new events in your inbox</h2>
        <p className="mx-auto mt-3 max-w-xl opacity-90">
          One short email a week with the drives happening near you. No spam, ever.
        </p>
        <form onSubmit={submit} noValidate className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="input input-bordered w-full text-base-content"
          />
          <button className="btn btn-secondary px-8">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
