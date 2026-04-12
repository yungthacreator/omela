import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import PortalClient from "./PortalClient";

export default async function PortalPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <PortalClient
      userName={session.user.name ?? undefined}
      userImage={session.user.image ?? null}
      signOutAction={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    />
  );
}
