"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";

import UserTable from "@/components/users/UserTable";
import CreateUserDialog from "@/components/users/CreateUserDialog";

import AppPagination from "@/components/common/AppPagination";

import { Input } from "@/components/ui/input";

import { getUsers } from "@/services/user.service";

import { User } from "@/types/user";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const data =
          await getUsers(
            page,
            search
          );

        setUsers(data.users);

        setTotalPages(
          data.pagination.pages
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchUsers();
  }, [page, search]);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Users
            </h1>

            <p className="text-muted-foreground">
              Manage users and roles
            </p>
          </div>

          <CreateUserDialog />
        </div>

        {/* Search */}
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(
              e.target.value
            );
          }}
          className="max-w-sm"
        />

        {/* Table */}
        <UserTable data={users} />

        {/* Empty State */}
        {!loading &&
          users.length === 0 && (
            <div className="py-10 text-center text-muted-foreground">
              No users found
            </div>
          )}

        {/* Pagination */}
        <AppPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </AppLayout>
  );
}