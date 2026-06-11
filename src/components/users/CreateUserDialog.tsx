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

import UserForm, {
  UserFormValues,
} from "./UserForm";

import { createUser } from "@/services/user.service";
import { getRoles } from "@/services/role.service";
import { toast } from "sonner";
import axios from "axios";

interface Role {
  id: string;
  name: string;
}

export default function CreateUserDialog() {
  const [open, setOpen] = useState(false);

  const [roles, setRoles] = useState<Role[]>([]);

  const form =
    useForm<UserFormValues>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        roleId: "",
      },
    });

useEffect(() => {
  const loadRoles = async () => {
    const data = await getRoles();

    console.log("ROLES:", data);

    setRoles(data.roles);
  };

  loadRoles();
}, []);

const onSubmit = async (
  values: UserFormValues
) => {
  try {
    await createUser({
      name: values.name,
      email: values.email,
      password: values.password || "",
      roleId: values.roleId,
    });

    toast.success(
      "User created successfully"
    );

    form.reset();

    setOpen(false);

    window.location.reload();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create user"
      );
    } else {
      toast.error(
        "Failed to create user"
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
        <Button>Create User</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create User
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
          />

          <Button
            type="submit"
            className="w-full"
          >
            Create User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}