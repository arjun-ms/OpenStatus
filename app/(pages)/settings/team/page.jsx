'use client'

import React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertTriangle } from 'lucide-react'

export default function TeamPage() {
  const pathname = usePathname()

  const settingsNavItems = [
    {
      title: "General",
      href: "/settings",
      icon: "⚙️",
    },
    {
      title: "Team",
      href: "/settings/team",
      icon: "👥",
    },
    {
      title: "API Token",
      href: "/settings/api",
      icon: "🔑",
    },
    {
      title: "Billing",
      href: "/settings/billing",
      icon: "💳",
    },
    {
      title: "Appearance",
      href: "/settings/appearance",
      icon: "🎨",
    },
    {
      title: "User",
      href: "/settings/user",
      icon: "👤",
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-[250px_1fr] gap-8">
          {/* Settings Sidebar */}
          <nav className="space-y-1">
            {settingsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-muted"
                    : "hover:bg-muted"
                )}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
                <p className="text-sm text-muted-foreground">
                  Team settings for the workspace.
                </p>
              </div>
              <Button variant="secondary">
                Invite Member
              </Button>
            </div>

            {/* Pro Feature Alert */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="text-sm text-amber-800">
                  <p>Team members is a Pro feature.</p>
                  <p>
                    If you want to use team members, please upgrade your plan. Go to{" "}
                    <Link href="/settings" className="font-medium underline">
                      settings
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Team Members Table */}
            <div className="rounded-md border">
              <div className="grid grid-cols-[1fr,120px,120px] gap-4 p-4 text-sm font-medium text-muted-foreground">
                <div>Email</div>
                <div>Role</div>
                <div>Created</div>
              </div>
              <div className="grid grid-cols-[1fr,120px,120px] gap-4 border-t p-4">
                <div className="text-sm">mohanlal@gmail.com</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    owner
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Dec 13, 2024</div>
              </div>
              
              <div className="grid grid-cols-[1fr,120px,120px] gap-4 border-t p-4">
                <div className="text-sm">mammooty@gmail.com</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    member
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Dec 14, 2024</div>
              </div>

              <div className="grid grid-cols-[1fr,120px,120px] gap-4 border-t p-4">
                <div className="text-sm">dileep@gmail.com</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    member
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Dec 15, 2024</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

