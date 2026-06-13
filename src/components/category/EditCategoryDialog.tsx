"use client";

import { ReactNode, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { getCategory, updateCategory } from "@/services/category.service";

import CategoryForm, { CategoryFormValues } from "./CategoryForm";

import { toast } from "sonner";

interface Props {
  categoryId: string;
  trigger: ReactNode;
}

export default function EditCategoryDialog({ categoryId, trigger }: Props) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    const loadData = async () => {
      const category = await getCategory(categoryId);

      form.reset({
        name: category.name,
        slug: category.slug,
        description: category.description || "",
      });
    };

    loadData();
  }, [open]);

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      setLoading(true);

      await updateCategory(categoryId, values);

      toast.success("Category updated successfully");

      setOpen(false);

      window.location.reload();
    } catch {
      toast.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CategoryForm form={form} />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
