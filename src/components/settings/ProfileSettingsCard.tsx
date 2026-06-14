"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import { updateSettings } from "@/services/settings.service";

import { uploadImage } from "@/services/upload.service";

interface Props {
  user: any;
  onUpdated: (user: any) => void;
}

export default function ProfileSettingsCard({ user, onUpdated }: Props) {
  const [name, setName] = useState(user.name);

  const [email, setEmail] = useState(user.email);

  const [avatar, setAvatar] = useState(user.avatar || "");

  const [saving, setSaving] = useState(false);

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const uploaded = await uploadImage(file);

    setAvatar(uploaded.url);
  };

  const save = async () => {
    try {
      setSaving(true);

      const res = await updateSettings({
        name,
        email,
        avatar,
      });

      onUpdated(res.data);

      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>

        <CardDescription>Update your account details</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={avatar || "https://placehold.co/120x120"}
            className="h-20 w-20 rounded-full object-cover border"
          />

          <Input type="file" accept="image/*" onChange={handleAvatar} />
        </div>

        <div>
          <Label>Name</Label>

          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <Label>Email</Label>

          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <Button onClick={save} disabled={saving}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
