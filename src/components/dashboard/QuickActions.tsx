// components/dashboard/QuickActions.tsx
import Link from "next/link";

import {
  Users,
  Shield,
  FolderTree,
  FileText,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Create Post",
    description: "Publish a new article",
    href: "/posts/create",
    icon: FileText,
    color: "blue",
  },
  {
    title: "Create User",
    description: "Add a team member",
    href: "/users",
    icon: Users,
    color: "violet",
  },
  {
    title: "Create Role",
    description: "Define permissions",
    href: "/roles",
    icon: Shield,
    color: "emerald",
  },
  {
    title: "Create Category",
    description: "Organize content",
    href: "/categories",
    icon: FolderTree,
    color: "amber",
  },
] as const;

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  violet:
    "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  emerald:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  amber:
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
};

export default function QuickActions() {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">Quick actions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorMap[action.color]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <p className="font-medium leading-none">{action.title}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>

                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
