import Link from "next/link";

interface FilterSidebarProps {
  categories: { name: string; slug: string; postCount: number }[];
  activeCategory: string;
  search: string;
}

function buildHref(params: Record<string, string>) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v),
  ).toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default function FilterSidebar({
  categories,
  activeCategory,
  search,
}: FilterSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:h-fit">
      <div className="rounded-2xl border border-white/[0.08] bg-[#111113] p-5">
        <h2 className="mb-3 text-sm font-semibold text-zinc-300">
          Categories
        </h2>
        <ul className="space-y-1">
          <li>
            <Link
              href={buildHref({ search })}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                !activeCategory
                  ? "bg-white/[0.06] font-medium text-white"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              }`}
            >
              All posts
            </Link>
          </li>
          {categories.map((c) => {
            const active = activeCategory === c.slug;
            return (
              <li key={c.slug}>
                <Link
                  href={buildHref({
                    search,
                    category: active ? "" : c.slug,
                  })}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-white/[0.06] font-medium text-white"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-zinc-500">{c.postCount}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}