import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const permissions =
      await prisma.permission.findMany({
        orderBy: {
          name: "asc",
        },
      });

    return NextResponse.json({
      success: true,
      data: permissions,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch permissions",
      },
      {
        status: 500,
      }
    );
  }
}