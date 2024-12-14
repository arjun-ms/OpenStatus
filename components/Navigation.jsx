"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const { user, getUser } = useKindeBrowserClient();
  const alsoUser = getUser();

  const pathname = usePathname();

  const navItems = [
    {
      title: "Monitors",
      href: "/monitors",
    },
    {
      title: "Incidents",
      href: "/incidents",
    },
    {
      title: "Status Pages",
      href: "/status",
    },
    {
      title: "Notifications",
      href: "/notifications",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ];

  return (
    <header className="border-b">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-foreground" />
            <span className="font-medium">{user?.given_name}</span>
          </div>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-foreground border-b-2 border-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
