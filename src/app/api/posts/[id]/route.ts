import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { updatePostSchema } from "@/lib/validations/post.validation";
import { ZodError } from "zod";
import { hasPermission } from "@/lib/permissions";
import { createAuditLog } from "@/lib/audit-log";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/* =====================================
   GET SINGLE POST
===================================== */

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const post = await prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },

      include: {
        category: true,

        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch post",
      },
      {
        status: 500,
      },
    );
  }
}

/* =====================================
   UPDATE POST
===================================== */

export async function PUT(request: NextRequest, { params }: Params) {
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
const canUpdate =
  await hasPermission(
    "manage_posts"
  );

    if (!canUpdate) {
      return NextResponse.json(
        {
          success: false,
          message: "You don't have permission to update posts",
        },
        {
          status: 403,
        },
      );
    }
    const { id } = await params;

    const body = await request.json();

    const data = updatePostSchema.parse(body);

    const existingPost = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    const oldStatus = existingPost?.status;
    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        {
          status: 404,
        },
      );
    }

    if (data.slug && data.slug !== existingPost.slug) {
      const slugExists = await prisma.post.findUnique({
        where: {
          slug: data.slug,
        },
      });

      if (slugExists) {
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
    }

    const post = await prisma.post.update({
      where: {
        id,
      },

      data,

      include: {
        category: true,
        author: true,
      },
    });
    await createAuditLog("POST_UPDATED", "POST", post.id, {
      title: post.title,
      status: post.status,
    });
    if (oldStatus !== "PUBLISHED" && post.status === "PUBLISHED") {
      await createAuditLog("POST_PUBLISHED", "POST", post.id, {
        title: post.title,
      });
    }
    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("UPDATE POST ERROR:", error);

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
          error instanceof Error ? error.message : "Failed to update post",
      },
      {
        status: 500,
      },
    );
  }
}

/* =====================================
   DELETE POST
===================================== */

export async function DELETE(request: NextRequest, { params }: Params) {
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
const canDelete =
  await hasPermission(
    "manage_posts"
  );

    if (!canDelete) {
      return NextResponse.json(
        {
          success: false,
          message: "You don't have permission to delete posts",
        },
        {
          status: 403,
        },
      );
    }
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        {
          status: 404,
        },
      );
    }

    const deletedPost = await prisma.post.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });

    await createAuditLog("POST_DELETED", "POST", deletedPost.id, {
      title: deletedPost.title,
    });

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete post",
      },
      {
        status: 500,
      },
    );
  }
}
