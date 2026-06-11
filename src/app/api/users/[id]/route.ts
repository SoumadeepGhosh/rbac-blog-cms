import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateUserSchema } from "@/lib/validations/user.validation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
// Get user by id
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },

      include: {
        roles: {
          include: {
            role: true,
          },
        },
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

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}

// Edit User

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateUserSchema.parse(body);

    const user = await prisma.user.update({
      where: {
        id,
      },

      data: {
        name: data.name,
        email: data.email,
        isActive: data.isActive,
      },
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete User

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    await prisma.user.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      {
        status: 500,
      },
    );
  }
}
