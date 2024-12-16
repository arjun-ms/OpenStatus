import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Monitors from "./components/Monitors";

export const metadata = {
  title: "Home",
};

// async means it will perform some asynchronous tasks (like fetching data) before returning the UI.
export default async function Page() {
  // get the session of logged in user
  const { getUser } = getKindeServerSession();

  // Check if the user is already logged in the browser
  const user = await getUser();
  if (!user || !user.id) {
    redirect("/auth-callback?origin=monitors");
  }

  // If logged in browser, also check the database for the user
  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user?.id,
    },
  });

  // If no user is found in the database (i.e., dbUser is null), it redirects the user to the authentication page (/auth-callback?origin=monitors), as the user needs to be authenticated in the system.
  if (!dbUser) {
    redirect("/auth-callback?origin=monitors");
  }

  // returns if all condtns are met
  return (
    <section className={`${inter.className}`}>
      <MaxWidthWrapper>
        <Monitors />
      </MaxWidthWrapper>
    </section>
  );
}
