import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "@/lib/prisma";

import {
  updateCategorySchema,
} from "@/lib/validations/category.validation";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const category =
    await prisma.category.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

  return NextResponse.json({
    success: true,
    data: category,
  });
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateCategorySchema.parse(
      body
    );

  const category =
    await prisma.category.update({
      where: {
        id,
      },

      data,
    });

  return NextResponse.json({
    success: true,
    data: category,
  });
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  await prisma.category.update({
    where: {
      id,
    },

    data: {
      deletedAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
  });
}