"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

type User = { name: string; email: string; image: string | null };

const privateLinks = [
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
  { href: "/profile", label: "My Profile" },
];

export default function NavbarClient({ user }: { user: User | null }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  }

  const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();
  const active = (href: string) => (pathname === href ? "text-primary font-semibold" : "");

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/60 bg-base-100/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-5 text-sm sm:flex">
            <Link href="/" className={`hover:text-primary ${active("/")}`}>Home</Link>
            <Link href="/events" className={`hover:text-primary ${active("/events")}`}>Upcoming Events</Link>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/events" className="btn btn-ghost btn-sm sm:hidden">Events</Link>
          <ThemeToggle />
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="tooltip tooltip-bottom btn btn-ghost btn-circle avatar"
                  data-tip={user.name}
                  aria-label="Open profile menu"
                >
                  <Avatar src={user.image} name={user.name} size={40} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
                >
                  <li className="menu-title px-3 py-2">
                    <span className="block text-sm font-semibold text-base-content">{user.name}</span>
                    <span className="block truncate text-xs font-normal">{user.email}</span>
                  </li>
                  {privateLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={closeMenu} className={active(l.href)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li className="sm:hidden">
                    <button onClick={logout} className="text-error">Logout</button>
                  </li>
                </ul>
              </div>
              <button onClick={logout} className="btn btn-outline btn-primary btn-sm hidden sm:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
