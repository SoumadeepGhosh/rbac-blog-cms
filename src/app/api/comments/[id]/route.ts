import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/permissions";
import { createAuditLog } from "@/lib/audit-log";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const allowed = await hasPermission("manage_comments");

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

    const { id } = await params;

    const body = await request.json();

    const comment = await prisma.comment.update({
      where: {
        id,
      },

      data: {
        isApproved: body.isApproved,
      },
    });
    await createAuditLog(
      body.isApproved ? "COMMENT_APPROVED" : "COMMENT_UNAPPROVED",
      "COMMENT",
      comment.id,
      {
        name: comment.name,
        email: comment.email,
        postId: comment.postId,
      },
    );
    return NextResponse.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update comment",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const allowed = await hasPermission("manage_comments");

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

    const { id } = await params;

    await prisma.comment.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });
    const comment = await prisma.comment.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });

    await createAuditLog("COMMENT_DELETED", "COMMENT", comment.id, {
      name: comment.name,
      email: comment.email,
      postId: comment.postId,
    });
    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete comment",
      },
      {
        status: 500,
      },
    );
  }
}
