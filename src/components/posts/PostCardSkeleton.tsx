// components/posts/PostCardSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function PostCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm">
      <div className="aspect-[16/10] w-full animate-pulse bg-muted" />

      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-3">
          <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />

          <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted" />

          <div className="space-y-1.5">
            <div className="h-3.5 w-full animate-pulse rounded-md bg-muted" />

            <div className="h-3.5 w-2/3 animate-pulse rounded-md bg-muted" />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />

            <div className="space-y-1.5">
              <div className="h-3 w-20 animate-pulse rounded-md bg-muted" />

              <div className="h-3 w-14 animate-pulse rounded-md bg-muted" />
            </div>
          </div>

          <div className="flex gap-1.5">
            <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />

            <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}