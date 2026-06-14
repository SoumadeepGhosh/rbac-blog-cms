// components/dashboard/RecentPostsCard.tsx
import { FileText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  posts: any[];
}

const statusStyles: Record<string, string> = {
  PUBLISHED:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  DRAFT:
    "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-400",
  ARCHIVED: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function RecentPosts({ posts }: Props) {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent posts</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {posts.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No posts yet
          </p>
        )}

        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <FileText className="h-4 w-4" />
            </div>

            <div className="flex-1 overflow-hidden">
              <h4 className="truncate font-medium leading-none">
                {post.title}
              </h4>

              <p className="mt-1 text-xs text-muted-foreground">
                {post.author?.name}
              </p>
            </div>

            <Badge
              variant="outline"
              className={statusStyles[post.status] ?? ""}
            >
              {post.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
