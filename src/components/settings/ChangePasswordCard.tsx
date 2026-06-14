"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { changePassword } from "@/services/settings.service";

export default function ChangePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Password updated");

      setCurrentPassword("");

      setNewPassword("");
    } catch {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>

        <CardDescription>Update your account password</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Current Password</Label>

          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div>
          <Label>New Password</Label>

          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <Button
          className="w-full md:w-auto"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </CardContent>
    </Card>
  );
}
