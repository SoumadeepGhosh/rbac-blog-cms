"use client";

import { ReactNode, useState } from "react";
import { toast } from "sonner";

import { deleteUser } from "@/services/user.service";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteUserDialogProps {
  userId: string;
  trigger: ReactNode;
}

export default function DeleteUserDialog({
  userId,
  trigger,
}: DeleteUserDialogProps) {
  const [loading, setLoading] =
    useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteUser(userId);

      toast.success(
        "User deleted successfully"
      );

      window.location.reload();
    } catch {
      toast.error(
        "Failed to delete user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete User
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be
            undone. The user will be
            soft deleted from the
            system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}