import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-[family-name:var(--font-heading)] text-7xl font-bold text-primary">404</p>
      <h1 className="section-title mt-3">We couldn’t find that page</h1>
      <p className="section-sub mt-3">The event or page may have been removed, or the link is incorrect.</p>
      <Link href="/events" className="btn btn-primary mt-7">Browse upcoming events</Link>
    </div>
  );
}
