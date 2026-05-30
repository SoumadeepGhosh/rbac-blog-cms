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
      },
      {
        title: "Categories",
        href: "/categories",
        icon: FolderTree,
      },
      {
        title: "Comments",
        href: "/comments",
        icon: MessageSquare,
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
      },
      {
        title: "Roles",
        href: "/roles",
        icon: Shield,
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
      },
    ],
  },
];