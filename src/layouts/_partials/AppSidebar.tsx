"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/configs/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import UserNav from "./UserNav";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/user.service";

export default function AppSidebar() {
  const pathname = usePathname();
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();

      const perms = user.roles.flatMap((userRole: any) =>
        userRole.role.permissions.map((rp: any) => rp.permission.slug),
      );

      setPermissions(perms);
    }

    loadUser();
  }, []);
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="px-2 py-4">
          <h1 className="text-lg font-semibold">RBAC CMS</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigation
          .map((section) => ({
            ...section,

            items: section.items.filter(
              (item) =>
                !item.permission || permissions.includes(item.permission),
            ),
          }))
          .filter((section) => section.items.length > 0)
          .map((section) => (
            <SidebarGroup key={section.group}>
              <SidebarGroupLabel>{section.group}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items
                    .filter((item) => {
                      if (!item.permission) {
                        return true;
                      }

                      return permissions.includes(item.permission);
                    })
                    .map((item) => {
                      const Icon = item.icon;

                      return (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.href}
                          >
                            <Link href={item.href}>
                              <Icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
      </SidebarContent>

      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
