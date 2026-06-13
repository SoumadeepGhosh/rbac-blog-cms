"use client";

import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

export interface CategoryFormValues {
  name: string;
  slug: string;
  description?: string;
}

interface Props {
  form: UseFormReturn<CategoryFormValues>;
}

export default function CategoryForm({ form }: Props) {
  const { register } = form;

  return (
    <div className="space-y-4">
      <Input placeholder="Category Name" {...register("name")} />

      <Input placeholder="Slug" {...register("slug")} />

      <Input placeholder="Description" {...register("description")} />
    </div>
  );
}
