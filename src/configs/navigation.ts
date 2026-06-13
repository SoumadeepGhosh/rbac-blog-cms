import {
  LayoutDashboard,
  FileText,
  FolderTree,
  MessageSquare,
  Users,
  Shield,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    group: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        permission: "view_dashboard",
      },
    ],
  },

  {
    group: "Content",
    items: [
      {
        title: "Posts",
        href: "/posts",
        icon: FileText,
        permission: "manage_posts",
      },
      {
        title: "Categories",
        href: "/categories",
        icon: FolderTree,
        permission: "manage_categories",
      },
      {
        title: "Comments",
        href: "/comments",
        icon: MessageSquare,
        permission: "manage_comments",
      },
    ],
  },

  {
    group: "Administration",
    items: [
      {
        title: "Users",
        href: "/users",
        icon: Users,
        permission: "manage_users",
      },
      {
        title: "Roles",
        href: "/roles",
        icon: Shield,
        permission: "manage_roles",
      },
    ],
  },

  {
    group: "System",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        permission: "manage_settings", // create later if needed
      },
    ],
  },
];
