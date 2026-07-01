import BlogCard from "./BlogCard";

interface Props {
  posts: any[];
}

export default function RelatedPosts({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold">Related Posts</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
