"use client";

import { motion } from "framer-motion";
import {
  ArrowDownAZ,
  LayoutGrid,
  List,
  Sparkles,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface ResultsToolbarProps {
  total: number;
  sort: string;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

const SORT_OPTIONS = [
  {
    value: "newest",
    label: "Newest first",
  },
  {
    value: "oldest",
    label: "Oldest first",
  },
  {
    value: "popular",
    label: "Most popular",
  },
];

export default function ResultsToolbar({
  total,
  sort,
  view,
  onViewChange,
}: ResultsToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .45,
      }}
      className="
        rounded-3xl
        border
        border-border/60
        bg-card/70
        backdrop-blur-xl
        p-6
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}

        <div>

          <div className="flex items-center gap-2">

            <Sparkles className="h-4 w-4 text-primary" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Latest Articles
            </span>

          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            {total} {total === 1 ? "Article" : "Articles"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Browse the latest engineering articles, tutorials and notes.
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {/* SORT */}

          <div className="relative">

            <ArrowDownAZ className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <select
              aria-label="Sort articles"
              value={sort}
              onChange={(e) =>
                handleSortChange(e.target.value)
              }
              className="
                h-12
                rounded-2xl
                border
                border-border
                bg-background
                pl-11
                pr-10
                text-sm
                font-medium
                outline-none
                transition-all
                hover:border-primary/30
                focus:border-primary
              "
            >
              {SORT_OPTIONS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

          </div>

          {/* VIEW */}

          <div
            className="
              flex
              items-center
              rounded-2xl
              border
              border-border
              bg-background
              p-1
            "
          >
            <button
              onClick={() => onViewChange("grid")}
              aria-label="Grid View"
              className={`
                rounded-xl
                p-3
                transition-all
                ${
                  view === "grid"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>

            <button
              onClick={() => onViewChange("list")}
              aria-label="List View"
              className={`
                rounded-xl
                p-3
                transition-all
                ${
                  view === "list"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}