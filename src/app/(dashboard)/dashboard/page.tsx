import ContentPieChart from "@/components/dashboard/ContentPieChart";
import StatsCard from "@/components/dashboard/StatsCard";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import AppLayout from "@/layouts/AppLayout";
import {
  Users,
  Shield,
  FileText,
  FolderTree,
} from "lucide-react";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

export default function DashboardPage() {
  return (
<AppLayout>
  <div className="mx-auto max-w-7xl space-y-8">

    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-muted-foreground">
        Welcome back, Admin
      </p>
    </div>

    {/* Stats */}
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Users"
        value={125}
        icon={Users}
        description="Registered users"
      />

      <StatsCard
        title="Roles"
        value={3}
        icon={Shield}
        description="System roles"
      />

      <StatsCard
        title="Posts"
        value={42}
        icon={FileText}
        description="Published posts"
      />

      <StatsCard
        title="Categories"
        value={8}
        icon={FolderTree}
        description="Available categories"
      />
    </div>

    {/* Charts */}
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <UserGrowthChart />
      </div>

      <ContentPieChart />
    </div>

    {/* Activity */}
    <ActivityTimeline />

  </div>
</AppLayout>
  );
}