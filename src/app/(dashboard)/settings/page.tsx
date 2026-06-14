"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";

import ProfileSettingsCard from "@/components/settings/ProfileSettingsCard";
import ChangePasswordCard from "@/components/settings/ChangePasswordCard";
import DangerZoneCard from "@/components/settings/DangerZoneCard";

import { getSettings } from "@/services/settings.service";

import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings();

        setUser(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-[60vh] items-center justify-center">
          Loading...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

          <p className="text-muted-foreground">
            Manage your profile, security and account preferences.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600" />

          <CardContent className="-mt-12 p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user?.avatar || ""} />

                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user?.name}</h2>

                <p className="text-muted-foreground">{user?.email}</p>

                <Badge className="mt-3">Active Account</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <ProfileSettingsCard user={user} onUpdated={setUser} />

        <ChangePasswordCard />

        <DangerZoneCard />
      </div>
    </AppLayout>
  );
}
