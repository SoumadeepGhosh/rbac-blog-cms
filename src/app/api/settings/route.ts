import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import { updateSettingsSchema } from "@/lib/validations/settings.validation";

import { createAuditLog } from "@/lib/audit-log";

export async function GET() {
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

    return NextResponse.json({
      success: true,

      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        emailVerified: user.emailVerified,
        isActive: user.isActive,

        roles: user.roles.map((r) => ({
          id: r.role.id,
          name: r.role.name,
          slug: r.role.slug,
        })),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load settings",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const body = await request.json();

    const data = updateSettingsSchema.parse(body);

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: data.email,
        NOT: {
          id: user.id,
        },
      },
    });

    if (existingEmail) {
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

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },

      data,
    });

    await createAuditLog(
      "PROFILE_UPDATED",
      "USER",
      updatedUser.id,
      {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    );

    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      {
        status: 500,
      },
    );
  }
}