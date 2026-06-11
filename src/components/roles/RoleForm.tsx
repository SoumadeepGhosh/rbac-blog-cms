"use client";

import { UseFormReturn } from "react-hook-form";

export interface RoleFormValues {
  name: string;
  slug: string;
  description?: string;
  permissionIds: string[];
}

interface Permission {
  id: string;
  name: string;
}

interface Props {
  form: UseFormReturn<RoleFormValues>;
  permissions: Permission[];
}

export default function RoleForm({
  form,
  permissions,
}: Props) {
  const {
    register,
    watch,
    setValue,
  } = form;

  const selected =
    watch("permissionIds") || [];

  return (
    <div className="space-y-4">

      <input
        {...register("name")}
        placeholder="Role Name"
        className="w-full rounded-md border p-2"
      />

      <input
        {...register("slug")}
        placeholder="Slug"
        className="w-full rounded-md border p-2"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full rounded-md border p-2"
      />

      <div className="space-y-2">
        <p className="font-medium">
          Permissions
        </p>

        {permissions.map(
          (permission) => (
            <label
              key={permission.id}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selected.includes(
                  permission.id
                )}
                onChange={(e) => {
                  if (
                    e.target.checked
                  ) {
                    setValue(
                      "permissionIds",
                      [
                        ...selected,
                        permission.id,
                      ]
                    );
                  } else {
                    setValue(
                      "permissionIds",
                      selected.filter(
                        (id) =>
                          id !==
                          permission.id
                      )
                    );
                  }
                }}
              />

              {permission.name}
            </label>
          )
        )}
      </div>
    </div>
  );
}