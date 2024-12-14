import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <MaxWidthWrapper>
        <div className="text-center">
          <Link href="/monitors">
            <Button>Go to Monitors</Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
