import { NextRequest, NextResponse } from "next/server";

import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import { changePasswordSchema } from "@/lib/validations/settings.validation";

import { createAuditLog } from "@/lib/audit-log";

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

    const data = changePasswordSchema.parse(body);

    const validPassword = await argon2.verify(
      user.password,
      data.currentPassword,
    );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await argon2.hash(data.newPassword);

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password: hashedPassword,
      },
    });

    await createAuditLog("PASSWORD_CHANGED", "USER", user.id);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to change password",
      },
      {
        status: 500,
      },
    );
  }
}
