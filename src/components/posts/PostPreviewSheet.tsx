"use client";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { Monitor, Tablet, Smartphone, Eye } from "lucide-react";

interface Props {
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
}

type Device = "desktop" | "tablet" | "mobile";

const SHEET_SIZES: Record<Device, { width: string; maxWidth: string }> = {
  desktop: { width: "90vw", maxWidth: "1400px" },
  tablet: { width: "70vw", maxWidth: "850px" },
  mobile: { width: "420px", maxWidth: "420px" },
};

const PREVIEW_WIDTH: Record<Device, string> = {
  desktop: "100%",
  tablet: "100%",
  mobile: "100%",
};

export default function PostPreviewSheet({
  title,
  excerpt,
  content,
  featuredImage,
}: Props) {
  const [device, setDevice] = useState<Device>("desktop");

  const sheetSize = SHEET_SIZES[device];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          Preview Post
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"

        style={{
          width: sheetSize.width,
          maxWidth: sheetSize.maxWidth,
          transition: "width 300ms ease, max-width 300ms ease",
        }}
        className="!max-w-none overflow-y-auto p-0"
      >
        <SheetHeader className="border-b px-6 py-5">
          <div className="space-y-4">
            <div>
              <SheetTitle className="text-xl">Blog Preview</SheetTitle>

              <p className="text-sm text-muted-foreground">
                Preview your article on different devices
              </p>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1 rounded-2xl border bg-background p-1 shadow-md">
                <Button
                  type="button"
                  size="sm"
                  variant={device === "desktop" ? "default" : "ghost"}
                  onClick={() => setDevice("desktop")}
                  className="rounded-xl"
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  Desktop
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={device === "tablet" ? "default" : "ghost"}
                  onClick={() => setDevice("tablet")}
                  className="rounded-xl"
                >
                  <Tablet className="mr-2 h-4 w-4" />
                  Tablet
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={device === "mobile" ? "default" : "ghost"}
                  onClick={() => setDevice("mobile")}
                  className="rounded-xl"
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile
                </Button>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="flex justify-center p-6 md:p-8">
          <div
            style={{ width: PREVIEW_WIDTH[device] }}
            className="rounded-3xl border bg-background shadow-xl overflow-hidden transition-all duration-300"
          >
            <div className="p-6 md:p-10">
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={title}
                  className="
                    mb-8
                    aspect-video
                    w-full
                    rounded-2xl
                    border
                    object-cover
                  "
                />
              )}

              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {title || "Untitled Post"}
              </h1>

              {excerpt && (
                <p className="mt-5 text-lg text-muted-foreground">{excerpt}</p>
              )}

              <div className="mt-8 flex items-center gap-4 border-b pb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted font-semibold">
                  A
                </div>

                <div>
                  <p className="font-medium">Admin</p>

                  <p className="text-sm text-muted-foreground">Preview Mode</p>
                </div>
              </div>

              <article
                className="
                  prose
                  prose-neutral
                  dark:prose-invert
                  mt-10
                  max-w-none
                  break-words
                "
                dangerouslySetInnerHTML={{
                  __html: content || "<p>No content added yet.</p>",
                }}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}