"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";

import CommentTable from "@/components/comments/CommentTable";

import AppPagination from "@/components/common/AppPagination";

import { Input } from "@/components/ui/input";

import { getComments } from "@/services/comment.service";

import { Comment } from "@/types/comment";

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const data = await getComments(page, search);

        setComments(data.comments);

        setTotalPages(data.pagination.pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchComments();
  }, [page, search]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Comments</h1>

          <p className="text-muted-foreground">Manage blog comments</p>
        </div>

        <Input
          placeholder="Search comments..."
          value={search}
          onChange={(e) => {
            setPage(1);

            setSearch(e.target.value);
          }}
          className="max-w-sm"
        />

        <CommentTable data={comments} />

        {!loading && comments.length === 0 && (
          <div className="py-10 text-center text-muted-foreground">
            No comments found
          </div>
        )}

        <AppPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </AppLayout>
  );
}
