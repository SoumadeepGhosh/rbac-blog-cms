"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Role } from "@/types/role";

import EditRoleDialog from "./EditRoleDialog";
import DeleteRoleDialog from "./DeleteRoleDialog";

export const columns: ColumnDef<Role>[] =
  [
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "slug",
      header: "Slug",
    },

    {
      id: "permissions",

      header: "Permissions",

      cell: ({ row }) => (
        <Badge>
          {
            row.original
              .permissions.length
          }{" "}
          Permissions
        </Badge>
      ),
    },

    {
      accessorKey: "createdAt",

      header: "Created",

      cell: ({ row }) =>
        new Date(
          row.original.createdAt
        ).toLocaleDateString(),
    },

    {
      id: "actions",

      header: "Actions",

      cell: ({ row }) => {
        const role =
          row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
            >
              <Button
                variant="ghost"
                size="icon"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <EditRoleDialog
                roleId={role.id}
                trigger={
                  <DropdownMenuItem
                    onSelect={(
                      e
                    ) =>
                      e.preventDefault()
                    }
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                }
              />

              <DeleteRoleDialog
                roleId={role.id}
                trigger={
                  <DropdownMenuItem
                    onSelect={(
                      e
                    ) =>
                      e.preventDefault()
                    }
                    className="text-red-500"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];