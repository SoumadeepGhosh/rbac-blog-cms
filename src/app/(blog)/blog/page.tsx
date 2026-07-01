import { Suspense } from "react";
import {
  getPublishedPosts,
  type BlogSort,
} from "@/services/public-blog.service";
import { getCategoriesWithCounts } from "@/services/blog-filter.service";
import SearchBar from "@/components/public/blog/SearchBar";
import Pagination from "@/components/public/blog/Pagination";
import FilterSidebar from "@/components/public/blog/FilterSidebar";
import ResultsView from "@/components/public/blog/ResultView";
import { CardSkeletonGrid } from "@/components/public/blog/CardSkiliton";
import BlogHero from "@/components/public/blog/BlogHero";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

const VALID_SORTS: BlogSort[] = ["newest", "oldest", "popular"];

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const category = params.category || "";
  const sort = VALID_SORTS.includes(params.sort as BlogSort)
    ? (params.sort as BlogSort)
    : "newest";

  return (
    <section className="container mx-auto px-4 py-24">
  <BlogHero />

<div className="mb-14">
  <div className="mx-auto max-w-4xl">
    <SearchBar defaultValue={search} />
  </div>
</div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <Suspense fallback={<SidebarSkeleton />}>
          <SidebarData category={category} search={search} />
        </Suspense>

        <Suspense
          key={`${page}-${search}-${category}-${sort}`}
          fallback={<CardSkeletonGrid />}
        >
          <ResultsData
            page={page}
            search={search}
            category={category}
            sort={sort}
          />
        </Suspense>
      </div>
    </section>
  );
}

async function SidebarData({
  category,
  search,
}: {
  category: string;
  search: string;
}) {
  const categories = await getCategoriesWithCounts();

  return (
    <FilterSidebar
      categories={categories}
      activeCategory={category}
      search={search}
    />
  );
}

async function ResultsData({
  page,
  search,
  category,
  sort,
}: {
  page: number;
  search: string;
  category: string;
  sort: BlogSort;
}) {
  const { posts, pagination } = await getPublishedPosts({
    page,
    search,
    category,
    sort,
  });

  return (
    <div className="space-y-10">
      <ResultsView
        posts={posts}
        total={pagination.total}
        sort={sort}
        search={search}
      />
      {pagination.pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          search={search}
        />
      )}
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="h-fit rounded-2xl border border-white/[0.08] bg-[#111113] p-5">
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 animate-pulse rounded-lg bg-white/[0.04]"
          />
        ))}
      </div>
    </div>
  );
}