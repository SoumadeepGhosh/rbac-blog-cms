"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import RoleForm, {
  RoleFormValues,
} from "./RoleForm";

import { createRole } from "@/services/role.service";
import { getPermissions } from "@/services/permission.service";

import { toast } from "sonner";
import axios from "axios";

interface Permission {
  id: string;
  name: string;
}

export default function CreateRoleDialog() {
  const [open, setOpen] = useState(false);

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
    const loadPermissions =
      async () => {
        const data =
          await getPermissions();

        setPermissions(data);
      };

    loadPermissions();
  }, []);

  const onSubmit = async (
    values: RoleFormValues
  ) => {
    try {
      await createRole(values);

      toast.success(
        "Role created successfully"
      );

      form.reset();

      setOpen(false);

      window.location.reload();
    } catch (error) {
      if (
        axios.isAxiosError(error)
      ) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to create role"
        );
      } else {
        toast.error(
          "Failed to create role"
        );
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          Create Role
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Role
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
          >
            Create Role
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}