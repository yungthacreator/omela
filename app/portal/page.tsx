import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import PortalClient from "./PortalClient";

export default async function PortalPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <PortalClient
      userName={session.user.name ?? "Your workspace"}
      userImage={session.user.image ?? null}
      signOutAction={signOutAction}
    />
  );
}