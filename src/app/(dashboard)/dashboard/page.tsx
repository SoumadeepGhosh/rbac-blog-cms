// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

import AppLayout from "@/layouts/AppLayout";

import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickActions from "@/components/dashboard/QuickActions";
import DashboardStats from "@/components/dashboard/DashboardStats";

import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import ContentPieChart from "@/components/dashboard/ContentPieChart";

import RecentPosts from "@/components/dashboard/RecentPostsCard";
import RecentComments from "@/components/dashboard/RecentCommentsCard";

import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

import { getDashboard } from "@/services/dashboard.service";
import { getCurrentUser } from "@/services/user.service";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [dashboardData, userData] = await Promise.all([
          getDashboard(),
          getCurrentUser(),
        ]);

        setDashboard(dashboardData);
        setUser(userData);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-48 animate-pulse rounded-2xl bg-muted" />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-80 animate-pulse rounded-2xl bg-muted lg:col-span-2" />

            <div className="h-80 animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!dashboard) {
    return (
      <AppLayout>
        <div className="flex h-[500px] flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <p className="font-medium">Failed to load dashboard</p>

          <p className="text-sm text-muted-foreground">
            Please refresh the page or try again later.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <DashboardHero stats={dashboard.stats} userName={user?.name} />

        <QuickActions />

        <DashboardStats stats={dashboard.stats} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UserGrowthChart data={dashboard.userGrowth || []} />
          </div>

          <ContentPieChart data={dashboard.contentBreakdown || []} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentPosts posts={dashboard.recentPosts || []} />

          <RecentComments comments={dashboard.recentComments || []} />
        </div>

        <ActivityTimeline activities={dashboard.recentActivities || []} />
      </div>
    </AppLayout>
  );
}