import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function createAuditLog(
  action: string,
  entityType: string,
  entityId: string,
  metadata?: Prisma.JsonObject,
) {
  const user = await getCurrentUser();

  if (!user) return;

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action,
      entityType,
      entityId,
      metadata,
    },
  });
}