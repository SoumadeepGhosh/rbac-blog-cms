import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/permissions";

export async function GET() {
  try {
    const allowed = await hasPermission("view_dashboard");

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

    const [
      users,
      roles,
      posts,
      categories,
      comments,

      draftPosts,
      publishedPosts,
      archivedPosts,

      recentPosts,
      recentComments,
      recentActivities,

      usersByMonth,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          deletedAt: null,
        },
      }),

      prisma.role.count(),

      prisma.post.count({
        where: {
          deletedAt: null,
        },
      }),

      prisma.category.count({
        where: {
          deletedAt: null,
        },
      }),

      prisma.comment.count({
        where: {
          deletedAt: null,
        },
      }),

      prisma.post.count({
        where: {
          status: "DRAFT",
          deletedAt: null,
        },
      }),

      prisma.post.count({
        where: {
          status: "PUBLISHED",
          deletedAt: null,
        },
      }),

      prisma.post.count({
        where: {
          status: "ARCHIVED",
          deletedAt: null,
        },
      }),

      prisma.post.findMany({
        take: 5,

        where: {
          deletedAt: null,
        },

        include: {
          category: true,

          author: {
            select: {
              name: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.comment.findMany({
        take: 5,

        where: {
          deletedAt: null,
        },

        include: {
          post: {
            select: {
              title: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.auditLog.findMany({
        take: 10,

        include: {
          actor: {
            select: {
              name: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.user.findMany({
        where: {
          deletedAt: null,
        },

        select: {
          createdAt: true,
        },
      }),
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const growthMap: Record<string, number> = {};

    monthNames.forEach((month) => {
      growthMap[month] = 0;
    });

    usersByMonth.forEach((user) => {
      const month = monthNames[new Date(user.createdAt).getMonth()];

      growthMap[month] += 1;
    });

    const userGrowth = monthNames.map((month) => ({
      month,
      users: growthMap[month],
    }));

    return NextResponse.json({
      success: true,

      data: {
        stats: {
          users,
          roles,
          posts,
          categories,
          comments,
        },

        postStatus: {
          draft: draftPosts,
          published: publishedPosts,
          archived: archivedPosts,
        },

        contentBreakdown: [
          {
            name: "Posts",
            value: posts,
          },
          {
            name: "Categories",
            value: categories,
          },
          {
            name: "Comments",
            value: comments,
          },
        ],

        userGrowth,

        recentPosts,

        recentComments,

        recentActivities,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      {
        status: 500,
      },
    );
  }
}
