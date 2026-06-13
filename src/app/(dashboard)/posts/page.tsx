"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AppLayout from "@/layouts/AppLayout";

import { getPosts } from "@/services/post.service";

import { Post } from "@/types/post";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Search, Plus, Trash2 } from "lucide-react";
import DeletePostDialog from "@/components/posts/DeletePostDialog";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

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
      <div className="space-y-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Posts</h1>

            <p className="text-muted-foreground">
              Manage blog posts and content
            </p>
          </div>

          <Link href="/posts/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </Link>
        </div>

        {/* Search */}

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Loading */}

        {loading && <div className="text-center py-20">Loading...</div>}

        {/* Cards */}

        {!loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="flex h-full flex-col overflow-hidden border shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-56 w-full overflow-hidden bg-muted">
                  <img
                    src={post.featuredImage || "https://placehold.co/600x400"}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <CardContent className="flex flex-1 flex-col p-5">
                  <div>
                    <h2 className="min-h-[56px] line-clamp-2 text-xl font-semibold">
                      {post.title}
                    </h2>

                    <p className="mt-2 min-h-[60px] line-clamp-3 text-sm text-muted-foreground">
                      {post.excerpt || "No description available"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="secondary">{post.category?.name}</Badge>

                    <Badge>{post.status}</Badge>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {post.author?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-sm font-medium">
                          {post.author?.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto flex gap-2">
                      <Link href={`/posts/${post.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>

                      <DeletePostDialog
                        postId={post.id}
                        trigger={
                          <Button variant="destructive" size="sm">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty */}

        {!loading && filteredPosts.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <h3 className="text-lg font-semibold">No Posts Found</h3>

              <p className="text-muted-foreground">Create your first post.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
