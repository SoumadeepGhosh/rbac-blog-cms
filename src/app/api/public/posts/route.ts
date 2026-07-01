import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 9);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,
      status: "PUBLISHED" as const,

      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,

        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          featuredImage: true,
          createdAt: true,

          category: {
            select: {
              name: true,
              slug: true,
            },
          },

          author: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.post.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        posts,

        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog posts",
      },
      {
        status: 500,
      },
    );
  }
}
