"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center border-b px-6">
      <SidebarTrigger />

      <div className="ml-4">
        <h1 className="font-semibold">
          Dashboard
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}