// components/dashboard/StatsCard.tsx
import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type AccentColor = "blue" | "violet" | "emerald" | "amber";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  color: AccentColor;
}

const accentStyles: Record<AccentColor, { badge: string; bar: string }> = {
  blue: {
    badge:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    bar: "bg-blue-500",
  },
  violet: {
    badge:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    bar: "bg-violet-500",
  },
  emerald: {
    badge:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    bar: "bg-emerald-500",
  },
  amber: {
    badge:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    bar: "bg-amber-500",
  },
};

export default function StatsCard({ title, value, icon: Icon, color }: Props) {
  const accent = accentStyles[color];

  return (
    <Card className="relative overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <h3 className="text-3xl font-semibold tracking-tight">{value}</h3>
          </div>

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.badge}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>

      <span className={`absolute inset-x-0 bottom-0 h-1 ${accent.bar}`} />
    </Card>
  );
}
