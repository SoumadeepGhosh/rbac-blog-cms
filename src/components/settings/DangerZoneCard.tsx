"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { deleteAccount, logoutAllDevices } from "@/services/settings.service";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function DangerZoneCard() {
  const router = useRouter();

  const logoutAll = async () => {
    await logoutAllDevices();

    toast.success("Logged out from all devices");
  };

  const removeAccount = async () => {
    const confirmed = confirm("Delete account permanently?");

    if (!confirmed) return;

    await deleteAccount();

    toast.success("Account deleted");

    router.push("/login");
  };

  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h4 className="font-medium">Logout All Devices</h4>

            <p className="text-sm text-muted-foreground">
              Sign out from every active session.
            </p>
          </div>

          <Button variant="outline" onClick={logoutAll}>
            Logout All
          </Button>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
          <div>
            <h4 className="font-medium text-destructive">Delete Account</h4>

            <p className="text-sm text-muted-foreground">
              Permanently remove your account.
            </p>
          </div>

          <Button variant="destructive" onClick={removeAccount}>
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
