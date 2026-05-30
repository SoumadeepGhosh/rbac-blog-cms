import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import argon2 from "argon2";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  console.log("Starting database seed...");

  /*
Permissions
   */

  const permissions = [
    "manage_users",
    "manage_roles",
    "manage_posts",
    "manage_comments",
    "manage_categories",
    "view_dashboard",
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        slug: permission,
      },
      update: {},
      create: {
        name: permission,
        slug: permission,
      },
    });
  }

  console.log("✅ Permissions seeded");

  /*
   Roles
   */

  const superAdminRole = await prisma.role.upsert({
    where: {
      slug: "super_admin",
    },
    update: {},
    create: {
      name: "Super Admin",
      slug: "super_admin",
      description: "Full system access",
    },
  });

  console.log("✅ Super Admin Roles seeded");

  const userRole = await prisma.role.upsert({
    where: {
      slug: "user",
    },

    update: {},

    create: {
      name: "User",
      slug: "user",
      description: "Default user role",
    },
  });
  console.log("✅ User Role seeded");

  const dashboardPermission = await prisma.permission.findUnique({
    where: {
      slug: "view_dashboard",
    },
  });

  if (dashboardPermission) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: userRole.id,
          permissionId: dashboardPermission.id,
        },
      },

      update: {},

      create: {
        roleId: userRole.id,
        permissionId: dashboardPermission.id,
      },
    });
  }
  /*
   |--------------------------------------------------------------------------
   | Assign permissions to SUPER_ADMIN
   |--------------------------------------------------------------------------
   */

  const allPermissions = await prisma.permission.findMany();

  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log("✅ Role permissions assigned");

  /*
   |--------------------------------------------------------------------------
   | Create Super Admin User
   |--------------------------------------------------------------------------
   */

  const hashedPassword = await argon2.hash("Admin@123");

  const adminUser = await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
      emailVerified: true,
    },
  });

  console.log("✅ Super admin user created");

  /*
   |--------------------------------------------------------------------------
   | Assign SUPER_ADMIN role to user
   |--------------------------------------------------------------------------
   */

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: superAdminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: superAdminRole.id,
    },
  });

  console.log("✅ Super admin role assigned");

  console.log("🎉 Database seeding completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
