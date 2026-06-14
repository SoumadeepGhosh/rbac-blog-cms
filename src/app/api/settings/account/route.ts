import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import { createAuditLog } from "@/lib/audit-log";

export async function DELETE() {
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

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        deletedAt: new Date(),
      },
    });

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await createAuditLog("ACCOUNT_DELETED", "USER", user.id);

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete account",
      },
      {
        status: 500,
      },
    );
  }
}
