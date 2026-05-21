import { redirect } from "next/navigation";
import PortalClient from "./PortalClient";

export default function PortalPage() {
  async function signOutAction() {
    "use server";
    redirect("/login");
  }

  return (
    <PortalClient
      userName="Pavium"
      userImage={null}
      signOutAction={signOutAction}
    />
  );
}