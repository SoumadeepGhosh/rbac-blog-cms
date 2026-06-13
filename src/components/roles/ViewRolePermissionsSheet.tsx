"use client";

import { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import { Shield } from "lucide-react";

import { Role } from "@/types/role";

interface Props {
  role: Role;
  trigger: ReactNode;
}

export default function ViewRolePermissionsSheet({ role, trigger }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {role.name}
          </SheetTitle>

          <SheetDescription>
            {role.permissions?.length || 0} permission
            {(role.permissions?.length || 0) !== 1 ? "s" : ""} assigned to this
            role
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border p-4">
            <h3 className="font-medium">Role Information</h3>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>

                <span className="font-medium">{role.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Slug</span>

                <span className="font-mono">{role.slug}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4" />

              <h3 className="font-medium">Permissions</h3>
            </div>

            {role.permissions?.length ? (
              <div className="space-y-2">
                {role.permissions.map((item) => (
                  <div
                    key={item.permission.id}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                  >
                    <span>
                      {item.permission.name
                        .replaceAll("_", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>

                    <Badge variant="secondary">Active</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No permissions assigned
              </p>
            )}
          </div>

          <div className="rounded-xl bg-muted p-3 text-sm">
            Total Permissions:{" "}
            <span className="font-semibold">
              {role.permissions?.length || 0}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
