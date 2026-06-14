// components/dashboard/RecentCommentsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  comments: any[];
}

function getInitials(name?: string) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function RecentComments({ comments }: Props) {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent comments</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {comments.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No comments yet
          </p>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl border p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-semibold text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
                {getInitials(comment.name)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium leading-none">
                    {comment.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {comment.content}
                </p>

                <p className="mt-2 inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {comment.post?.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
