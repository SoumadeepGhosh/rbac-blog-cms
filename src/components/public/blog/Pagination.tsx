import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  totalPages: number;
  search?: string;
}

export default function Pagination({ currentPage, totalPages, search }: Props) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (search) params.set("search", search);
    return `/blog?${params.toString()}`;
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <Button variant="outline" size="sm" disabled={currentPage <= 1} asChild>
        <Link href={buildHref(Math.max(1, currentPage - 1))}>Previous</Link>
      </Button>

      <span className="px-3 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button variant="outline" size="sm" disabled={currentPage >= totalPages} asChild>
        <Link href={buildHref(Math.min(totalPages, currentPage + 1))}>Next</Link>
      </Button>
    </div>
  );
}