"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";

import CategoryTable from "@/components/category/CategoryTable";
import CreateCategoryDialog from "@/components/category/CreateCategoryDialog";

import AppPagination from "@/components/common/AppPagination";

import { Input } from "@/components/ui/input";

import { getCategories } from "@/services/category.service";

import { Category } from "@/types/category";

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchCategories =
      async () => {
        try {
          setLoading(true);

          const data =
            await getCategories(
              page,
              search
            );

          setCategories(
            data.categories
          );

          setTotalPages(
            data.pagination.pages
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    void fetchCategories();
  }, [page, search]);

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Categories
            </h1>

            <p className="text-muted-foreground">
              Manage blog categories
            </p>
          </div>

          <CreateCategoryDialog />
        </div>

        {/* Search */}
        <Input
          placeholder="Search categories..."
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
        <CategoryTable
          data={categories}
        />

        {/* Empty State */}
        {!loading &&
          categories.length ===
            0 && (
            <div className="py-10 text-center text-muted-foreground">
              No categories found
            </div>
          )}

        {/* Pagination */}
        <AppPagination
          page={page}
          totalPages={
            totalPages
          }
          onPageChange={
            setPage
          }
        />
      </div>
    </AppLayout>
  );
}