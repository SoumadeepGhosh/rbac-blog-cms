import "server-only";
import { prisma } from "@/lib/prisma";

// Categories with a live count of published, non-deleted posts. Used to
// drive the listing page's category filter chips.
export async function getCategoriesWithCounts() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      color: true,
      _count: {
        select: {
          posts: { where: { status: "PUBLISHED", deletedAt: null } },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return categories
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      color: c.color,
      postCount: c._count.posts,
    }))
    .filter((c) => c.postCount > 0);
}