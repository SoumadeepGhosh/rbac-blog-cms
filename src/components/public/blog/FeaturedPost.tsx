"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3, Eye } from "lucide-react";

interface FeaturedPostProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    createdAt: string | Date;
    readingTime?: number | null;
    views?: number;
    category: {
      name: string;
      slug: string;
    } | null;
    author: {
      name: string | null;
      avatar: string | null;
    } | null;
  };
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mb-16"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="group overflow-hidden rounded-[32px] border border-border bg-card">
          <div className="grid lg:grid-cols-[1.15fr_.85fr]">
            {/* Image */}

            <div className="relative h-[420px] overflow-hidden">
              <Image
                src={post.featuredImage ?? "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {post.category && (
                <div className="absolute left-6 top-6 rounded-full bg-background/80 px-4 py-2 text-sm font-semibold backdrop-blur">
                  {post.category.name}
                </div>
              )}
            </div>

            {/* Content */}

            <div className="flex flex-col justify-center p-10">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Featured Article
              </p>

              <h2 className="text-4xl font-black leading-tight transition-colors group-hover:text-primary">
                {post.title}
              </h2>

              <p className="mt-6 line-clamp-4 text-lg leading-8 text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  {post.readingTime ?? 5} min read
                </div>

                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {post.views ?? 0}
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 text-primary font-semibold">
                Read article
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
