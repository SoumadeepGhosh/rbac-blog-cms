"use client";

import Link from "next/link";

import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <SearchX className="h-20 w-20 text-muted-foreground" />
        </div>

        <h1 className="text-5xl font-bold">
          404
        </h1>

        <p className="mt-4 text-muted-foreground">
          The page you're looking for
          doesn't exist.
        </p>

        <Link href="/dashboard">
          <Button className="mt-8">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}