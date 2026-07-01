"use client";

import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Bookmark, Clock, Eye, Heart } from "lucide-react";

interface BlogCardPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  createdAt: string | Date;
  category: { name: string; slug: string } | null;
  author: { name: string | null; avatar: string | null } | null;
  views?: number;
  likes?: number;
  readingTime?: number | null;
}

interface BlogCardProps {
  post: BlogCardPost;
  /** Index within a grid — used to vary the entrance delay slightly */
  index?: number;
}

// Fallback estimate only used when readingTime hasn't been computed/stored
// on the post yet (e.g. older posts created before the column existed).
function estimateReadingTime(excerpt: string | null) {
  const words = excerpt?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const minutes = Math.max(1, Math.round((words * 8) / 200));
  return minutes;
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [bookmarked, setBookmarked] = useState(false);

  // --- Subtle 3D tilt, driven by pointer position relative to the card ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [6, -6]),
    { stiffness: 200, damping: 20, mass: 0.5 },
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
    { stiffness: 200, damping: 20, mass: 0.5 },
  );

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function handlePointerMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const readingTime = post.readingTime ?? estimateReadingTime(post.excerpt);
  const authorInitial = post.author?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, #3B82F6, #6366F1, #8B5CF6, #06B6D4)",
        }}
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#18181B] shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-shadow duration-300 group-hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.35)]"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(500px circle at ${x} ${y}, rgba(99,102,241,0.12), transparent 60%)`,
            ),
          }}
        />

        <Link
          href={`/blog/${post.slug}`}
          className="relative block aspect-[16/10] w-full overflow-hidden"
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#3B82F6]/20 via-[#6366F1]/20 to-[#8B5CF6]/20" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/10 to-transparent" />

          {post.category && (
            <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {post.category.name}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setBookmarked((b) => !b);
            }}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark this post"}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
          >
            <Bookmark
              className="h-4 w-4"
              fill={bookmarked ? "currentColor" : "none"}
            />
          </button>
        </Link>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <Link href={`/blog/${post.slug}`} className="space-y-2">
            <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-[#A5B4FC] line-clamp-2">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-sm leading-relaxed text-zinc-400 line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </Link>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]">
                {post.author?.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name ?? "Author"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs font-medium text-white">
                    {authorInitial}
                  </span>
                )}
              </div>
              <div className="min-w-0 text-xs text-zinc-400">
                <p className="truncate font-medium text-zinc-300">
                  {post.author?.name ?? "Unknown"}
                </p>
                <p>{format(new Date(post.createdAt), "dd MMM yyyy")}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {readingTime}m
              </span>
              {typeof post.views === "number" && (
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {formatCount(post.views)}
                </span>
              )}
              {typeof post.likes === "number" && (
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" />
                  {formatCount(post.likes)}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}