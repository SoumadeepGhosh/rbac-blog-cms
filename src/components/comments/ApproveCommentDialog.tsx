"use client";

import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { updateComment } from "@/services/comment.service";

import { toast } from "sonner";

import { Comment } from "@/types/comment";

interface Props {
  comment: Comment;
  trigger: ReactNode;
}

export default function ApproveCommentDialog({ comment, trigger }: Props) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateComment(comment.id, {
        isApproved: !comment.isApproved,
      });

      toast.success(
        comment.isApproved ? "Comment unapproved" : "Comment approved",
      );

      setOpen(false);

      window.location.reload();
    } catch {
      toast.error("Failed to update comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {comment.isApproved ? "Unapprove Comment" : "Approve Comment"}
          </DialogTitle>
        </DialogHeader>

        <p>Are you sure?</p>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : comment.isApproved ? "Unapprove" : "Approve"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
