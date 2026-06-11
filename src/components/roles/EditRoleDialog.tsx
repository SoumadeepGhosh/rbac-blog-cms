"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  getRole,
  updateRole,
} from "@/services/role.service";

import { getPermissions } from "@/services/permission.service";

import RoleForm, {
  RoleFormValues,
} from "./RoleForm";

import { toast } from "sonner";

interface Permission {
  id: string;
  name: string;
}

interface Props {
  roleId: string;
  trigger: ReactNode;
}

export default function EditRoleDialog({
  roleId,
  trigger,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [permissions, setPermissions] =
    useState<Permission[]>([]);

  const form =
    useForm<RoleFormValues>({
      defaultValues: {
        name: "",
        slug: "",
        description: "",
        permissionIds: [],
      },
    });

  useEffect(() => {
    if (!open) return;

    const loadData =
      async () => {
        const [
          role,
          permissionData,
        ] = await Promise.all([
          getRole(roleId),
          getPermissions(),
        ]);

        setPermissions(
          permissionData
        );

        form.reset({
          name: role.name,
          slug: role.slug,
          description:
            role.description ||
            "",
          permissionIds:
            role.permissions.map(
              (
                p: {
                  permission: {
                    id: string;
                  };
                }
              ) =>
                p.permission.id
            ),
        });
      };

    loadData();
  }, [open]);

  const onSubmit = async (
    values: RoleFormValues
  ) => {
    try {
      setLoading(true);

      await updateRole(
        roleId,
        values
      );

      toast.success(
        "Role updated successfully"
      );

      setOpen(false);

      window.location.reload();
    } catch {
      toast.error(
        "Failed to update role"
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
            Edit Role
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <RoleForm
            form={form}
            permissions={
              permissions
            }
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Role"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}