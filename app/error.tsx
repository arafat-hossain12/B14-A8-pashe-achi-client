"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="section-title">Something went wrong</h1>
      <p className="section-sub mt-3">We couldn’t load this page. Check your connection and try again.</p>
      <button onClick={reset} className="btn btn-primary mt-7">Try again</button>
    </div>
  );
}
