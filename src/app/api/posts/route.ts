import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { createPostSchema } from "@/lib/validations/post.validation";
import { ZodError } from "zod";
import { createAuditLog } from "@/lib/audit-log";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page") || 1);

    const limit = Number(searchParams.get("limit") || 10);

    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,

      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          slug: {
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

        include: {
          category: true,

          author: {
            select: {
              id: true,
              name: true,
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
        message: "Failed to fetch posts",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
    const canCreate =
  await hasPermission(
    "manage_posts"
  );

    if (!canCreate) {
      return NextResponse.json(
        {
          success: false,
          message: "You don't have permission to create posts",
        },
        {
          status: 403,
        },
      );
    }
    const body = await request.json();

    const data = createPostSchema.parse(body);

    const existing = await prisma.post.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists",
        },
        {
          status: 409,
        },
      );
    }

    const post = await prisma.post.create({
      data: {
        ...data,

        authorId: user.id,
      },

      include: {
        category: true,
        author: true,
      },
    });
    await createAuditLog("POST_CREATED", "POST", post.id, {
      title: post.title,
      status: post.status,
      author: post.author.name,
    });
    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create post",
      },
      {
        status: 500,
      },
    );
  }
}
