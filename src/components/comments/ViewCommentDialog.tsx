"use client";

import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Comment } from "@/types/comment";

interface Props {
  comment: Comment;
  trigger: ReactNode;
}

export default function ViewCommentDialog({ comment, trigger }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Comment Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>

              <p className="font-medium">{comment.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>

              <p className="font-medium">{comment.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Post</p>

            <p className="font-medium">{comment.post?.title}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Status</p>

            {comment.isApproved ? (
              <Badge>Approved</Badge>
            ) : (
              <Badge variant="secondary">Pending</Badge>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Comment</p>

            <div className="rounded-lg border p-4">{comment.content}</div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Created At</p>

            <p>{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
