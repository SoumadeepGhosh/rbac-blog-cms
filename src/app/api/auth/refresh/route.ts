import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { generateAccessToken, verifyRefreshToken } from "@/lib/jwt";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Refresh token missing",
        },
        {
          status: 401,
        },
      );
    }

    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid refresh token",
        },
        {
          status: 401,
        },
      );
    }

    const session = await prisma.session.findUnique({
      where: {
        refreshToken,
      },
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Session expired",
        },
        {
          status: 401,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Account disabled",
        },
        {
          status: 403,
        },
      );
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Token refreshed",
      },
      {
        status: 200,
      },
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to refresh token",
      },
      {
        status: 500,
      },
    );
  }
}
