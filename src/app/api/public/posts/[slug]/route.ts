import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
) {
  try {
    const { slug } = await params;

    const post = await prisma.post.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
        deletedAt: null,
      },

      include: {
        category: true,

        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },

        comments: {
          where: {
            isApproved: true,
            deletedAt: null,
          },

          orderBy: {
            createdAt: "desc",
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
