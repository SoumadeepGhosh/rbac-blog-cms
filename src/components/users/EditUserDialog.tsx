"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import { useForm } from "react-hook-form";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import UserForm, {
  UserFormValues,
} from "./UserForm";

import {
  getUser,
  updateUser,
} from "@/services/user.service";

import { getRoles } from "@/services/role.service";

interface Role {
  id: string;
  name: string;
}

interface Props {
  userId: string;
  trigger: ReactNode;
}

export default function EditUserDialog({
  userId,
  trigger,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [roles, setRoles] =
    useState<Role[]>([]);

  const form =
    useForm<UserFormValues>({
      defaultValues: {
        name: "",
        email: "",
        roleId: "",
      },
    });

  useEffect(() => {
    if (!open) return;

    const loadData = async () => {
      const [user, roleData] =
        await Promise.all([
          getUser(userId),
          getRoles(),
        ]);

setRoles(roleData.roles);

      form.reset({
        name: user.name,
        email: user.email,
        roleId:
          user.roles?.[0]?.roleId ||
          "",
      });
    };

    loadData();
  }, [open]);

  const onSubmit = async (
    values: UserFormValues
  ) => {
    try {
      setLoading(true);

      await updateUser(
        userId,
        values
      );

      toast.success(
        "User updated successfully"
      );

      setOpen(false);

      window.location.reload();
    } catch {
      toast.error(
        "Failed to update user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit User
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <UserForm
            form={form}
            roles={roles}
            isEdit
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}