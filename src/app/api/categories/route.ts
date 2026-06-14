import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { createCategorySchema } from "@/lib/validations/category.validation";

import { hasPermission } from "@/lib/permissions";
import { createAuditLog } from "@/lib/audit-log";

// LIST CATEGORIES

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
          name: {
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

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.category.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        categories,

        pagination: {
          page,
          limit,
          total,

          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error: any) {
    console.error("CATEGORY GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch categories",
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE CATEGORY

export async function POST(request: NextRequest) {
  try {
    const allowed = await hasPermission("manage_categories");

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

    const body = await request.json();

    const data = createCategorySchema.parse(body);

    const existing = await prisma.category.findUnique({
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

    const category = await prisma.category.create({
      data,
    });
    await createAuditLog("CATEGORY_CREATED", "CATEGORY", category.id, {
      name: category.name,
      slug: category.slug,
    });
    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    console.error("CATEGORY CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create category",
      },
      {
        status: 500,
      },
    );
  }
}
