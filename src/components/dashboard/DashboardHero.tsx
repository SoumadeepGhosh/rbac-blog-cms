// components/dashboard/DashboardHero.tsx
import { Users, FileText, MessageSquare } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  stats: {
    users: number;
    posts: number;
    comments: number;
  };
  userName?: string;
}

export default function DashboardHero({ stats, userName }: Props) {
  const chips = [
    { label: "Users", value: stats.users, icon: Users },
    { label: "Posts", value: stats.posts, icon: FileText },
    { label: "Comments", value: stats.comments, icon: MessageSquare },
  ];

  return (
    <Card className="relative overflow-hidden rounded-2xl border-0 bg-slate-900 text-white shadow-lg dark:bg-slate-950">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

      <CardContent className="relative z-10 p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-300">Overview</p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome, {userName || "Admin"}
            </h1>

            <p className="mt-2 text-slate-400">
              Here&apos;s what&apos;s happening with your platform today.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {chips.map((chip) => {
              const Icon = chip.icon;

              return (
                <div
                  key={chip.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <Icon className="mb-3 h-5 w-5 text-slate-300" />

                  <p className="text-2xl font-semibold">{chip.value}</p>

                  <p className="text-xs text-slate-400">{chip.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
