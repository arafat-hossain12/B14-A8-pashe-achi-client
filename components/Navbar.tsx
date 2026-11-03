import { getSession } from "@/lib/session";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await getSession();
  const user = session
    ? { name: session.user.name, email: session.user.email, image: session.user.image ?? null }
    : null;
  return <NavbarClient user={user} />;
}
