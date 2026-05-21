import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import PortalClient from "./PortalClient";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-portal",
});

export default async function PortalPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className={inter.variable}>
      <PortalClient
        userName={session.user.name ?? "Pavium"}
        userImage={session.user.image ?? null}
        signOutAction={signOutAction}
      />
    </div>
  );
}