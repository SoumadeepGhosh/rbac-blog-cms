"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Loader2, Search, Sparkles, X } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = "" }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.delete("page");

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full"
    >
      <div
        className={`
          group relative overflow-hidden rounded-2xl
          border bg-card/80 backdrop-blur-xl
          transition-all duration-300
          ${
            isFocused
              ? "border-primary/50 shadow-lg shadow-primary/10"
              : "border-border hover:border-primary/20"
          }
        `}
      >
        {/* subtle gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]" />

        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search articles, technologies, tutorials..."
          className="
            h-16
            border-0
            bg-transparent
            pl-14
            pr-36
            text-base
            shadow-none
            placeholder:text-muted-foreground/70
            focus-visible:ring-0
          "
        />

        {/* Right Side */}
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {isPending && (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          )}

          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: .8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .8 }}
                whileTap={{ scale: .9 }}
                onClick={() => setValue("")}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg
                  bg-muted
                  transition-colors
                  hover:bg-muted/70
                "
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="hidden items-center gap-1 rounded-lg border border-border bg-background/80 px-2.5 py-1 text-xs text-muted-foreground md:flex">
            <Command className="h-3.5 w-3.5" />
            K
          </div>
        </div>
      </div>

      {/* Search Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        className="pointer-events-none mt-3 flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        Search by title, category, technology or keywords.
      </motion.div>
    </motion.div>
  );
}