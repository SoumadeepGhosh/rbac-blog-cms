import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activities = [
  {
    title: "User Registered",
    description: "John Doe joined the platform",
    time: "2 min ago",
  },
  {
    title: "Role Assigned",
    description: "Editor role assigned to Sarah",
    time: "10 min ago",
  },
  {
    title: "Post Published",
    description: "How RBAC Works was published",
    time: "1 hour ago",
  },
  {
    title: "Category Created",
    description: "Security category added",
    time: "2 hours ago",
  },
];

export default function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative space-y-6">
          <div className="absolute left-2 top-0 h-full w-px bg-border" />

          {activities.map((activity) => (
            <div
              key={activity.title}
              className="relative flex gap-4"
            >
              <div className="mt-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />

              <div className="flex-1">
                <p className="font-medium">
                  {activity.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}