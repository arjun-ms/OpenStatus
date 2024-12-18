import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Incidents from "./components/Incidents";
import { actionFetchAllIncidents } from "@/lib/actions";

export const metadata = {
  title: "Incidents",
};

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect("/auth-callback?origin=incidents");
  }

  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user?.id,
    },
  });

  if (!dbUser) {
    redirect("/auth-callback?origin=incidents");
  }

  const result = await actionFetchAllIncidents();

  return (
    <section className={`${inter.className}`}>
      <MaxWidthWrapper>
        <Incidents incidents={result.data} />
      </MaxWidthWrapper>
    </section>
  );
}
