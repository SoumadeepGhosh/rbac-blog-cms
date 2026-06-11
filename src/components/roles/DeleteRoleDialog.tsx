"use client";

import {
  ReactNode,
  useState,
} from "react";

import { toast } from "sonner";

import { deleteRole } from "@/services/role.service";

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

interface Props {
  roleId: string;
  trigger: ReactNode;
}

export default function DeleteRoleDialog({
  roleId,
  trigger,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const handleDelete =
    async () => {
      try {
        setLoading(true);

        await deleteRole(
          roleId
        );

        toast.success(
          "Role deleted successfully"
        );

        window.location.reload();
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to delete role"
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
            Delete Role
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={
              handleDelete
            }
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