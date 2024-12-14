// this component is for controlling the left right spacing in the app

import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({ className, children }) {
  return (
    // here the classnames in cn will always be present through out the app an will not be overwritten or replaced
    <div
      className={cn(
        "max-w-screen-xl w-full mx-auto px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}
