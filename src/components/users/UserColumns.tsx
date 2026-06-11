"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import DeleteUserDialog from "./DeleteUserDialog";
import EditUserDialog from "./EditUserDialog";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "role",

    header: "Role",

    cell: ({ row }) => {
      const role = row.original.roles?.[0]?.role;

      return <Badge variant="secondary">{role?.name || "No Role"}</Badge>;
    },
  },

  {
    accessorKey: "isActive",

    header: "Status",

    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge>Active</Badge>
      ) : (
        <Badge variant="destructive">Inactive</Badge>
      ),
  },

  {
    accessorKey: "createdAt",

    header: "Created",

    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },

  {
  id: "actions",

  header: "Actions",

  cell: ({ row }) => {
    const user = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">

          <EditUserDialog
            userId={user.id}
            trigger={
              <DropdownMenuItem
                onSelect={(e) =>
                  e.preventDefault()
                }
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            }
          />

          <DeleteUserDialog
            userId={user.id}
            trigger={
              <DropdownMenuItem
                onSelect={(e) =>
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
