import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/permissions";

import { createRoleSchema } from "@/lib/validations/role.validation";
import { createAuditLog } from "@/lib/audit-log";

// LIST ROLES

export async function GET(request: NextRequest) {
  try {
    const allowed = await hasPermission("manage_roles");

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

    const [roles, total] = await Promise.all([
      prisma.role.findMany({
        where,

        skip,
        take: limit,

        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },

        orderBy: {
          name: "asc",
        },
      }),

      prisma.role.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        roles,

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
        message: "Failed to fetch roles",
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE ROLE

export async function POST(request: NextRequest) {
  try {
    const allowed = await hasPermission("manage_roles");

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

    const data = createRoleSchema.parse(body);

    const existingRole = await prisma.role.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingRole) {
      return NextResponse.json(
        {
          success: false,
          message: "Role slug already exists",
        },
        {
          status: 409,
        },
      );
    }

    const role = await prisma.role.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,

        permissions: {
          create: data.permissionIds.map((permissionId) => ({
            permissionId,
          })),
        },
      },

      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
    await createAuditLog("ROLE_CREATED", "ROLE", role.id, {
      name: role.name,
      slug: role.slug,
    });
    return NextResponse.json(
      {
        success: true,
        data: role,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create role",
      },
      {
        status: 500,
      },
    );
  }
}
