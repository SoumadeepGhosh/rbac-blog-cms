import "server-only";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 9;

export type BlogSort = "newest" | "oldest" | "popular";

interface GetPublishedPostsParams {
  page?: number;
  search?: string;
  category?: string;
  sort?: BlogSort;
}

function buildOrderBy(sort: BlogSort) {
  if (sort === "oldest") return { createdAt: "asc" as const };
  if (sort === "popular") return { views: "desc" as const };
  return { createdAt: "desc" as const };
}

export async function getPublishedPosts({
  page = 1,
  search = "",
  category = "",
  sort = "newest",
}: GetPublishedPostsParams) {
  const skip = (page - 1) * PAGE_SIZE;

  const where = {
    deletedAt: null,
    status: "PUBLISHED" as const,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { excerpt: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(category ? { category: { slug: category } } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        createdAt: true,
        views: true,
        likes: true,
        readingTime: true,
        category: { select: { name: true, slug: true } },
        author: { select: { name: true, avatar: true } },
      },
      orderBy: buildOrderBy(sort),
    }),
    prisma.post.count({ where }),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit: PAGE_SIZE,
      total,
      pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    },
  };
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, status: "PUBLISHED", deletedAt: null },
    include: {
      category: true,
      author: { select: { id: true, name: true, avatar: true } },
      comments: {
        where: { isApproved: true, deletedAt: null },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getRelatedPosts(categoryId: string, excludeId: string) {
  return prisma.post.findMany({
    where: {
      categoryId,
      status: "PUBLISHED",
      deletedAt: null,
      id: { not: excludeId },
    },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      createdAt: true,
      views: true,
      likes: true,
      readingTime: true,
      category: { select: { name: true, slug: true } },
      author: { select: { name: true, avatar: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}