import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/AuthForms";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Login" };

export default async function LoginPage() {
  if (await getSession()) redirect("/");
  return <LoginForm />;
}
