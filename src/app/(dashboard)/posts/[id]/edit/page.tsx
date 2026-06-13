"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import AppLayout from "@/layouts/AppLayout";

import { getPost, updatePost } from "@/services/post.service";

import { getCategories } from "@/services/category.service";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowLeft, Save } from "lucide-react";
import PostEditor from "@/components/editor/PostEditor";
import PostPreviewSheet from "@/components/posts/PostPreviewSheet";

interface Category {
  id: string;
  name: string;
}

interface PostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categoryId: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export default function EditPostPage() {
  const router = useRouter();

  const params = useParams();

  const postId = params.id as string;

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  const { register, watch, setValue, handleSubmit, reset, control } =
    useForm<PostFormValues>();

  const image = watch("featuredImage");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [post, categoryData] = await Promise.all([
          getPost(postId),
          getCategories(),
        ]);

        setCategories(categoryData.categories ?? categoryData);

        reset({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          content: post.content,
          featuredImage: post.featuredImage || "",
          categoryId: post.categoryId,
          status: post.status,
        });
      } catch (error) {
        console.error(error);

        toast.error("Failed to load post");
      } finally {
        setPageLoading(false);
      }
    };

    if (postId) {
      loadData();
    }
  }, [postId, reset]);

  const onSubmit = async (values: PostFormValues) => {
    try {
      setLoading(true);

      await updatePost(postId, values);

      toast.success("Post updated successfully");

      router.push("/posts");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <AppLayout>
        <div className="flex h-[400px] items-center justify-center">
          Loading...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Edit Post</h1>

            <p className="text-muted-foreground">Update blog content</p>
          </div>

          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>

                  <CardDescription>Update post content</CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <Input placeholder="Title" {...register("title")} />

                  <Input placeholder="Slug" {...register("slug")} />

                  <Textarea
                    rows={4}
                    placeholder="Excerpt"
                    {...register("excerpt")}
                  />

                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <PostEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <PostPreviewSheet
                    title={watch("title")}
                    excerpt={watch("excerpt")}
                    content={watch("content")}
                    featuredImage={watch("featuredImage")}
                  />

                  <Button type="submit" className="w-full" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />

                    {loading ? "Updating..." : "Update Post"}
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Select
                    defaultValue={watch("categoryId")}
                    onValueChange={(value) => setValue("categoryId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    defaultValue={watch("status")}
                    onValueChange={(value) => setValue("status", value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>

                      <SelectItem value="PUBLISHED">Published</SelectItem>

                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Input
                    placeholder="Image URL"
                    {...register("featuredImage")}
                  />

                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      className="aspect-video w-full rounded-md border object-cover"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
