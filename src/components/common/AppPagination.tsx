"use client";

import { Button } from "@/components/ui/button";

interface AppPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AppPagination({
  page,
  totalPages,
  onPageChange,
}: AppPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next
      </Button>
    </div>
  );
}