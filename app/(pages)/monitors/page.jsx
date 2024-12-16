import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Monitors from "./components/Monitors";


export const metadata = {
  title: "Home",
};

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user || !user.id) {
    redirect("/auth-callback?origin=monitors");
  }

  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user?.id,
    },
  });

  if (!dbUser) {
    redirect("/auth-callback?origin=monitors");
  }


  return (
    <section className={`${inter.className}`}>
      <MaxWidthWrapper>
        <Monitors />
      </MaxWidthWrapper>
    </section>
  );
}