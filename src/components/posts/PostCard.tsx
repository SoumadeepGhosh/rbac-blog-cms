// components/posts/PostCard.tsx
import Link from "next/link";

import { Post } from "@/types/post";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";
import DeletePostDialog from "@/components/posts/DeletePostDialog";

interface Props {
  post: Post;
}

const statusStyles: Record<string, string> = {
  PUBLISHED:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  DRAFT:
    "border-muted-foreground/20 bg-muted text-muted-foreground",
  ARCHIVED:
    "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function PostCard({ post }: Props) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={post.featuredImage || "https://placehold.co/600x400"}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <Badge
          variant="outline"
          className={`absolute right-3 top-3 ${statusStyles[post.status] ?? ""}`}
        >
          {post.status}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <Badge
            variant="secondary"
            className="bg-accent text-accent-foreground"
          >
            {post.category?.name ?? "Uncategorized"}
          </Badge>

          <h2 className="line-clamp-2 text-lg font-semibold leading-snug">
            {post.title}
          </h2>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt || "No description available"}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                {post.author?.name?.charAt(0) ?? "?"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-none">
                {post.author?.name}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-1.5">
            <Link href={`/posts/${post.id}/edit`}>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </Link>

            <DeletePostDialog
              postId={post.id}
              trigger={
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-red-500/20 text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}