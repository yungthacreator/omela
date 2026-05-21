import { auth, signOut } from "@/auth";
import PortalClient from "./PortalClient";

export default async function PortalPage() {
  const session = await auth();

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <PortalClient
      userName={session?.user?.name ?? "Pavium"}
      userImage={session?.user?.image ?? null}
      signOutAction={signOutAction}
    />
  );
}