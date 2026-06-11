"use client";

import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

export interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  roleId: string;
}

interface Role {
  id: string;
  name: string;
}

interface Props {
  form: UseFormReturn<UserFormValues>;
  roles: Role[];
  isEdit?: boolean;
}

export default function UserForm({
  form,
  roles,
  isEdit = false,
}: Props) {
  const { register } = form;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Name"
        {...register("name")}
      />

      <Input
        placeholder="Email"
        {...register("email")}
      />

      {!isEdit && (
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      )}

      <select
        {...register("roleId")}
        className="w-full rounded-md border p-2"
      >
        <option value="">
          Select Role
        </option>

        {roles.map((role) => (
          <option
            key={role.id}
            value={role.id}
          >
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
}