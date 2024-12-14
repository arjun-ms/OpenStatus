'use client'

import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
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
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">General</h1>
              <p className="text-sm text-muted-foreground">
                General settings for the workspace.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter workspace name"
                  defaultValue="Documenso"
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground">
                  The name of your workspace.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Workspace Slug
                </label>
                <div className="max-w-md rounded-md bg-muted p-2">
                  <code className="text-sm">few-adult</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  The unique identifier for your workspace.
                </p>
              </div>

              <Button className="mt-4">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

