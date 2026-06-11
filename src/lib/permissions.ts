import { getCurrentUser } from "@/lib/auth";


// Check Role

export async function hasRole(roleSlug: string) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  return user.roles.some(
    (userRole) => userRole.role.slug === roleSlug
  );
}


// Check Permission

export async function hasPermission(
  permissionSlug: string
) {
  const user = await getCurrentUser();

  console.log("==========");
  console.log("Checking:", permissionSlug);
  console.log("User:", user?.email);
  console.log(
    "Roles:",
    JSON.stringify(user?.roles, null, 2)
  );
  console.log("==========");

  if (!user) {
    return false;
  }

  const allowed = user.roles.some(
    (userRole) =>
      userRole.role.permissions.some(
        (rolePermission) =>
          rolePermission.permission.slug ===
          permissionSlug
      )
  );

  console.log(
    "Permission Result:",
    allowed
  );

  return allowed;
}