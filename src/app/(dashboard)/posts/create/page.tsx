"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import AppLayout from "@/layouts/AppLayout";

import { createPost } from "@/services/post.service";
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
import { uploadImage } from "@/services/upload.service";
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
  featuredImage: File | null;
  categoryId: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export default function CreatePostPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  const { register, watch, setValue, handleSubmit } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: null,
      categoryId: "",
      status: "DRAFT",
    },
  });

  const image = watch("featuredImage");
  const title = watch("title");

  const excerpt = watch("excerpt");

  const content = watch("content");
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(data.categories ?? data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  const onSubmit = async (values: PostFormValues) => {
    try {
      setLoading(true);

      let imageUrl = "";

      if (values.featuredImage) {
        const uploaded = await uploadImage(values.featuredImage);

        imageUrl = uploaded.url;
      }
      console.log("FORM VALUES:", values);
      await createPost({
        ...values,
        featuredImage: imageUrl,
      });

      toast.success("Post created successfully");

      router.push("/posts");
    } catch (error: any) {
      const response = error?.response?.data;

      if (response?.errors?.fieldErrors) {
        const firstError = Object.values(response.errors.fieldErrors)[0];

        toast.error(
          Array.isArray(firstError) ? firstError[0] : response.message,
        );
      } else {
        toast.error(response?.message || "Failed to create post");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Post</h1>

            <p className="text-muted-foreground">
              Write and publish a new blog post
            </p>
          </div>

          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Side */}

            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>

                  <CardDescription>Main content of the post</CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Title
                    </label>

                    <Input
                      placeholder="Enter post title"
                      {...register("title")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Slug
                    </label>

                    <Input placeholder="nextjs-guide" {...register("slug")} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Excerpt
                    </label>

                    <Textarea
                      rows={4}
                      placeholder="Short summary..."
                      {...register("excerpt")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Content
                    </label>

                    <PostEditor
                      value={watch("content")}
                      onChange={(value) => setValue("content", value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side */}

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
                    featuredImage={image ? URL.createObjectURL(image) : ""}
                  />

                  <Button type="submit" disabled={loading} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : "Create Post"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Category
                    </label>

                    <Select
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
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Status
                    </label>

                    <Select
                      defaultValue="DRAFT"
                      onValueChange={(value) =>
                        setValue("status", value as any)
                      }
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
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>

                <CardContent>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setValue("featuredImage", file);
                      }
                    }}
                  />

                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="mt-4 aspect-video w-full rounded-md border object-cover"
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
