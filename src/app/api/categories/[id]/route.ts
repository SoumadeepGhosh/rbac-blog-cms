import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { updateCategorySchema } from "@/lib/validations/category.validation";
import { hasPermission } from "@/lib/permissions";
import { createAuditLog } from "@/lib/audit-log";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await params;
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
  const category = await prisma.category.findUnique({
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
  },
) {
  const { id } = await params;
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

  const data = updateCategorySchema.parse(body);

  const category = await prisma.category.update({
    where: {
      id,
    },

    data,
  });
  await createAuditLog("CATEGORY_UPDATED", "CATEGORY", category.id, {
    name: category.name,
    slug: category.slug,
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
  },
) {
  const { id } = await params;
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
  const category = await prisma.category.update({
    where: {
      id,
    },

    data: {
      deletedAt: new Date(),
    },
  });

  await createAuditLog("CATEGORY_DELETED", "CATEGORY", category.id, {
    name: category.name,
    slug: category.slug,
  });

  return NextResponse.json({
    success: true,
  });
}
