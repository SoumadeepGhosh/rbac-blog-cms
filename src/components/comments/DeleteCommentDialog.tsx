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

import { deleteComment } from "@/services/comment.service";

import { toast } from "sonner";

interface Props {
  commentId: string;
  trigger: ReactNode;
}

export default function DeleteCommentDialog({ commentId, trigger }: Props) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteComment(commentId);

      toast.success("Comment deleted");

      setOpen(false);

      window.location.reload();
    } catch {
      toast.error("Failed to delete comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment</DialogTitle>
        </DialogHeader>

        <p>This action cannot be undone.</p>

        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
