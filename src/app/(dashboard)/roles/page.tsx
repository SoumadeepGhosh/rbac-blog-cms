"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";

import RoleTable from "@/components/roles/RoleTable";
import CreateRoleDialog from "@/components/roles/CreateRoleDialog";

import AppPagination from "@/components/common/AppPagination";

import { Input } from "@/components/ui/input";

import { getRoles } from "@/services/role.service";

import { Role } from "@/types/role";

export default function RolesPage() {
  const [roles, setRoles] =
    useState<Role[]>([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);

        const data =
          await getRoles(
            page,
            search
          );

        setRoles(data.roles);

        setTotalPages(
          data.pagination.pages
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchRoles();
  }, [page, search]);

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Roles
            </h1>

            <p className="text-muted-foreground">
              Manage roles and permissions
            </p>
          </div>

          <CreateRoleDialog />
        </div>

        {/* Search */}
        <Input
          placeholder="Search roles..."
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
        <RoleTable data={roles} />

        {/* Empty State */}
        {!loading &&
          roles.length === 0 && (
            <div className="py-10 text-center text-muted-foreground">
              No roles found
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