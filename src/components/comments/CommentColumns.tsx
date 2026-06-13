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

import { MoreHorizontal, CheckCircle2, Eye, Trash2 } from "lucide-react";

import { Comment } from "@/types/comment";

import ViewCommentDialog from "./ViewCommentDialog";
import DeleteCommentDialog from "./DeleteCommentDialog";
import ApproveCommentDialog from "./ApproveCommentDialog";

export const columns: ColumnDef<Comment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "post",

    header: "Post",

    cell: ({ row }) => (
      <div className="max-w-[250px] truncate">{row.original.post?.title}</div>
    ),
  },

  {
    accessorKey: "isApproved",
    header: "Status",

    cell: ({ row }) =>
      row.original.isApproved ? (
        <Badge>Approved</Badge>
      ) : (
        <Badge variant="secondary">Pending</Badge>
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
      const comment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <ViewCommentDialog
              comment={comment}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </DropdownMenuItem>
              }
            />

            <ApproveCommentDialog
              comment={comment}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  {comment.isApproved ? "Unapprove" : "Approve"}
                </DropdownMenuItem>
              }
            />

            <DeleteCommentDialog
              commentId={comment.id}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
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
