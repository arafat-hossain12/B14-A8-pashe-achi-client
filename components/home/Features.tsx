const features = [
  { t: "Host an event in minutes", d: "Add a title, place, date and photo. Your event goes live for the whole community instantly.", i: "M12 5v14M5 12h14" },
  { t: "Join with one click", d: "Pick a cause close to you and sign up. Your joined events are always one tap away.", i: "M5 13l4 4L19 7" },
  { t: "Only real, upcoming events", d: "Past events disappear automatically, so everything you see is still open for volunteers.", i: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
  { t: "You stay in control", d: "Update details or cancel your own events whenever plans change. Nobody else can edit them.", i: "M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6z" },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="section-title">Everything a community drive needs</h2>
        <p className="section-sub mx-auto mt-3">
          From the first idea to the last volunteer, Pashe Achi keeps organising simple.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.t} className="h-full rounded-box border border-base-300 bg-base-100 p-6 transition hover:border-primary hover:shadow-lg">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-secondary/15 text-secondary">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.i} /></svg>
            </span>
            <h3 className="mb-2 text-lg font-bold">{f.t}</h3>
            <p className="text-sm leading-relaxed text-base-content/70">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
