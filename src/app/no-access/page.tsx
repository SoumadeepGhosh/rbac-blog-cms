"use client";

import { ShieldX, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function NoAccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-6">
      <div className="w-full max-w-lg rounded-3xl border bg-background p-10 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <ShieldX className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="text-3xl font-bold">Access Denied</h1>

        <p className="mt-3 text-muted-foreground">
          You don't have permission to access this page.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
        </div>
      </div>
    </div>
  );
}
