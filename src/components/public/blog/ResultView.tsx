"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BlogCard from "@/components/public/blog/BlogCard";
import FeaturedPost from "@/components/public/blog/FeaturedPost";
import ResultsToolbar from "./ResultsToolbar";
import EmptyState from "./EmptyState";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  createdAt: string | Date;
  views?: number;
  likes?: number;
  readingTime?: number | null;
  category: {
    name: string;
    slug: string;
  } | null;
  author: {
    name: string | null;
    avatar: string | null;
  } | null;
}

interface ResultsViewProps {
  posts: Post[];
  total: number;
  sort: string;
  search: string;
}

export default function ResultsView({
  posts,
  total,
  sort,
  search,
}: ResultsViewProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  const featuredPost = useMemo(() => posts[0], [posts]);

  const remainingPosts = useMemo(() => posts.slice(1), [posts]);

  if (posts.length === 0) {
    return (
      <div className="space-y-6">
        <ResultsToolbar
          total={total}
          sort={sort}
          view={view}
          onViewChange={setView}
        />

        <EmptyState search={search} />
      </div>
    );
  }

  return (
    <div className="space-y-14">
      <ResultsToolbar
        total={total}
        sort={sort}
        view={view}
        onViewChange={setView}
      />

      {/* Featured */}

      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* Latest */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
        }}
        className="space-y-8"
      >
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Latest Articles
          </span>

          <h2 className="text-3xl font-bold tracking-tight">
            Fresh insights & engineering notes
          </h2>

          <p className="max-w-2xl text-muted-foreground">
            Browse tutorials, development notes, production experiences and
            practical guides written while building modern software.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.35,
            }}
            className={
              view === "grid"
                ? "grid gap-8 md:grid-cols-2 2xl:grid-cols-3"
                : "mx-auto flex max-w-3xl flex-col gap-6"
            }
          >
            {remainingPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.section>
    </div>
  );
}
