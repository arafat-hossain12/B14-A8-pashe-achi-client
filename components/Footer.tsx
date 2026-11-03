import Link from "next/link";
import Logo from "./Logo";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const FbIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21z" />
  </svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="mt-16 bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="text-neutral-content [&_a]:text-neutral-content"><Logo /></div>
          <p className="text-sm leading-relaxed opacity-80">
            A community-driven platform to organise and join social service events – because every neighbourhood changes when neighbours show up.
          </p>
          <div className="flex gap-2">
            {[
              { l: "X", i: <XIcon /> },
              { l: "Facebook", i: <FbIcon /> },
              { l: "Instagram", i: <IgIcon /> },
              { l: "YouTube", i: <YtIcon /> },
            ].map((s) => (
              <a
                key={s.l}
                href="#"
                aria-label={s.l}
                className="grid h-9 w-9 place-items-center rounded-full border border-neutral-content/30 transition hover:border-secondary hover:bg-secondary hover:text-secondary-content"
              >
                {s.i}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Explore</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/events" className="hover:text-secondary">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="hover:text-secondary">Create an Event</Link></li>
            <li><Link href="/joined-events" className="hover:text-secondary">Joined Events</Link></li>
            <li><Link href="/manage-events" className="hover:text-secondary">Manage Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Causes</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Winter clothes distribution</li>
            <li>Tree plantation drives</li>
            <li>Blood donation camps</li>
            <li>Neighbourhood cleanups</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>House 12, Road 5, Mirpur 10, Dhaka 1216</li>
            <li>hello@pasheachi.org</li>
            <li>+880 1700-000000</li>
            <li>Sat – Thu, 9:00 AM – 6:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-content/15 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Pashe Achi. Made with care for our communities.
      </div>
    </footer>
  );
}
