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

  if (!user) {
    return false;
  }

  return user.roles.some((userRole) =>
    userRole.role.permissions.some(
      (rolePermission) =>
        rolePermission.permission.slug === permissionSlug
    )
  );
}