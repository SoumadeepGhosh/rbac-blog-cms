"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import CategoryForm, { CategoryFormValues } from "./CategoryForm";

import { createCategory } from "@/services/category.service";

import { toast } from "sonner";
import axios from "axios";

export default function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<CategoryFormValues>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      await createCategory(values);

      toast.success("Role created successfully");

      form.reset();

      setOpen(false);

      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create role");
      } else {
        toast.error("Failed to create role");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Category</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CategoryForm form={form} />

          <Button type="submit" className="w-full">
            Create Category
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
