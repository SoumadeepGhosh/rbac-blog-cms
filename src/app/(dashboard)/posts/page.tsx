// app/posts/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AppLayout from "@/layouts/AppLayout";

import { getPosts } from "@/services/post.service";

import { Post } from "@/types/post";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Search, Plus, FileX } from "lucide-react";

import PostCard from "@/components/posts/PostCard";
import PostCardSkeleton from "@/components/posts/PostCardSkeleton";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const data = await getPosts();

        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {loading
                ? "Loading posts..."
                : `${posts.length} ${posts.length === 1 ? "post" : "posts"} in total`}
            </p>
          </div>

          <Link href="/posts/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create post
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredPosts.length === 0 && (
          <Card className="rounded-2xl border shadow-sm">
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <FileX className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-medium">
                  {search ? "No posts match your search" : "No posts found"}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {search
                    ? "Try a different search term."
                    : "Create your first post to get started."}
                </p>
              </div>

              {!search && (
                <Link href="/posts/create">
                  <Button className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Create post
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}