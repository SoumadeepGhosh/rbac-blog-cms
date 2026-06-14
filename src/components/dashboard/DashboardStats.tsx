// components/dashboard/DashboardStats.tsx
import { Users, Shield, FileText, FolderTree } from "lucide-react";

import StatsCard from "./StatsCard";

interface Props {
  stats: {
    users: number;
    roles: number;
    posts: number;
    categories: number;
  };
}

export default function DashboardStats({ stats }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Users" value={stats.users} icon={Users} color="blue" />

      <StatsCard
        title="Roles"
        value={stats.roles}
        icon={Shield}
        color="violet"
      />

      <StatsCard
        title="Posts"
        value={stats.posts}
        icon={FileText}
        color="emerald"
      />

      <StatsCard
        title="Categories"
        value={stats.categories}
        icon={FolderTree}
        color="amber"
      />
    </div>
  );
}
