export function usePermissions() {
  const permissions = [
    "create_post",
    "edit_post",
    "delete_post",
  ];

  return {
    canCreatePost:
      permissions.includes(
        "create_post"
      ),

    canEditPost:
      permissions.includes(
        "edit_post"
      ),

    canDeletePost:
      permissions.includes(
        "delete_post"
      ),
  };
}