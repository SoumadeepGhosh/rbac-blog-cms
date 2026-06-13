import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/permissions";

export async function GET(request: NextRequest) {
  try {
    const allowed = await hasPermission("manage_comments");

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        },
      );
    }

    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page") || 1);

    const limit = Number(searchParams.get("limit") || 10);

    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,

      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,

        skip,
        take: limit,

        include: {
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.comment.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        comments,

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
        message: "Failed to fetch comments",
      },
      {
        status: 500,
      },
    );
  }
}
