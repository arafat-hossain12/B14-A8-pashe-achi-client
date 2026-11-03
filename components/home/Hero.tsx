import Link from "next/link";

const stats = [
  { n: "120+", l: "Events hosted" },
  { n: "3,400+", l: "Volunteers joined" },
  { n: "45", l: "Neighbourhoods" },
];

export default function Hero() {
  return (
    <section className="hero-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="badge badge-soft badge-primary mb-5 px-4 py-3 font-medium">
            Community service · Dhaka and beyond
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Small acts, done together, <span className="text-primary">change a neighbourhood.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-base-content/75">
            Find a clean-up, plantation drive or winter clothes distribution near you – or host your own and
            invite the neighbours. Pashe Achi means “I am beside you”.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary btn-lg">Explore Upcoming Events</Link>
            <Link href="/create-event" className="btn btn-outline btn-lg">Host an Event</Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary sm:text-3xl">{s.n}</dt>
                <dd className="text-xs text-base-content/70 sm:text-sm">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-secondary/25 blur-2xl" />
          <div className="absolute -bottom-8 -right-6 h-48 w-48 rounded-full bg-primary/25 blur-2xl" />
          <div className="relative space-y-4">
            {[
              { t: "Winter Clothes Distribution", p: "Mirpur 10, Dhaka", c: "Donation", rot: "-rotate-2" },
              { t: "Riverside Tree Plantation", p: "Hatirjheel, Dhaka", c: "Plantation", rot: "rotate-1 translate-x-6" },
              { t: "Blanket Drive for the Needy", p: "Mohammadpur, Dhaka", c: "Donation", rot: "-rotate-1" },
            ].map((x) => (
              <div key={x.t} className={`flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-lg ${x.rot}`}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 5 6 5c2 0 3.3 1 4 2.2C10.7 6 12 5 14 5c3.3 0 5.1 3.4 3.6 6.8C19.5 16.4 12 21 12 21z" /></svg>
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{x.t}</p>
                  <p className="text-sm text-base-content/70">{x.p}</p>
                </div>
                <span className="badge badge-secondary badge-sm ml-auto">{x.c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
