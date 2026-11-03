import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/AuthForms";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Register" };

export default async function RegisterPage() {
  if (await getSession()) redirect("/");
  return <RegisterForm />;
}
