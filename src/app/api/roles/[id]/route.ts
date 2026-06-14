import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { updateRoleSchema } from "@/lib/validations/role.validation";

import { hasPermission } from "@/lib/permissions";
import { createAuditLog } from "@/lib/audit-log";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

//Get Role By Id

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const role = await prisma.role.findUnique({
      where: {
        id,
      },

      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
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

    return NextResponse.json({
      success: true,
      data: role,
    });
  } catch {
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

// UPDATE ROLE
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const allowed = await hasPermission("manage_roles");

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

    const data = updateRoleSchema.parse(body);

    await prisma.rolePermission.deleteMany({
      where: {
        roleId: id,
      },
    });

    const role = await prisma.role.update({
      where: {
        id,
      },

      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,

        permissions: {
          create:
            data.permissionIds?.map((permissionId) => ({
              permissionId,
            })) || [],
        },
      },

      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
    await createAuditLog("ROLE_UPDATED", "ROLE", role.id, {
      name: role.name,
      slug: role.slug,
    });
    return NextResponse.json({
      success: true,
      data: role,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update role",
      },
      {
        status: 500,
      },
    );
  }
}

// DELETE ROLE

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const allowed = await hasPermission("manage_roles");

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

    const role = await prisma.role.findUnique({
      where: {
        id,
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

    if (role.slug === "super_admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Super Admin role cannot be deleted",
        },
        {
          status: 403,
        },
      );
    }

    const assignedUsers = await prisma.userRole.count({
      where: {
        roleId: id,
      },
    });

    if (assignedUsers > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Role is assigned to users",
        },
        {
          status: 400,
        },
      );
    }

    const deletedRole = await prisma.role.delete({
      where: {
        id,
      },
    });

    await createAuditLog("ROLE_DELETED", "ROLE", deletedRole.id, {
      name: deletedRole.name,
      slug: deletedRole.slug,
    });

    return NextResponse.json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete role",
      },
      {
        status: 500,
      },
    );
  }
}

//
