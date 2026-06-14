// components/dashboard/ActivityTimeline.tsx
import { Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  activities: {
    id: string;
    action: string;
    actor: { name: string };
    createdAt: string;
  }[];
}

export default function ActivityTimeline({ activities }: Props) {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent activity</CardTitle>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No recent activity
          </p>
        ) : (
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative flex gap-4 pl-1">
                {index !== activities.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-border" />
                )}

                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                  <Activity className="h-4 w-4" />
                </div>

                <div className="flex-1 pt-0.5">
                  <p className="font-medium leading-none">{activity.action}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.actor?.name}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
