import { SearchX } from "lucide-react";

interface EmptyStateProps {
  search: string;
}

export default function EmptyState({ search }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/[0.08] bg-[#111113]/50 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/15 text-[#A5B4FC]">
        <SearchX className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <p className="font-medium text-zinc-200">
          {search ? `No results for "${search}"` : "No articles match these filters"}
        </p>
        <p className="text-sm text-zinc-500">
          Try a different search term or clear your filters.
        </p>
      </div>
    </div>
  );
}