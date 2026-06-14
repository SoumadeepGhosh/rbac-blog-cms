import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/permissions";
import { createUserSchema } from "@/lib/validations/user.validation";
import { createAuditLog } from "@/lib/audit-log";

//     List User
export async function GET(request: NextRequest) {
  try {
    const allowed = await hasPermission("manage_users");

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
      ],
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,

        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.user.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        users,
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
        message: "Failed to fetch users",
      },
      {
        status: 500,
      },
    );
  }
}
//  Create User
export async function POST(request: NextRequest) {
  try {
    const allowed = await hasPermission("manage_users");

    console.log("CREATE USER ALLOWED:", allowed);

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

    const data = createUserSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 409,
        },
      );
    }

    const role = await prisma.role.findUnique({
      where: {
        id: data.roleId,
      },
    });

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message: "Role not found",
        },
        {
          status: 404,
        },
      );
    }

    const hashedPassword = await argon2.hash(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,

        roles: {
          create: {
            roleId: data.roleId,
          },
        },
      },

      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    await createAuditLog("USER_CREATED", "USER", user.id, {
      name: user.name,
      email: user.email,
      role: user.roles[0]?.role?.name,
    });
    return NextResponse.json(
      {
        success: true,
        data: user,
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
        message: "Failed to create user",
      },
      {
        status: 500,
      },
    );
  }
}
