"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-1">
      <ToggleGroup
        type="single"
        value={theme}
        onValueChange={(value) => {
          if (value) {
            setTheme(value);
          }
        }}
      >
        <ToggleGroupItem value="light" aria-label="Light Mode">
          <Sun className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem value="dark" aria-label="Dark Mode">
          <Moon className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem value="system" aria-label="System Theme">
          <Monitor className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}