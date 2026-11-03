import { requireUser } from "@/lib/session";

// Every page inside (private) is checked on the server.
// The session cookie survives a reload, so logged-in users are never bounced to /login.
export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return <>{children}</>;
}
