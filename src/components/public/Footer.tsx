import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="font-semibold">
            RBAC CMS
          </h3>

          <p className="max-w-md text-sm text-muted-foreground">
            Modern RBAC powered blog platform
            built with Next.js, Prisma and
            PostgreSQL.
          </p>

          <div className="flex gap-4 text-sm">
            <Link href="/blog">
              Blog
            </Link>

            <Link href="/projects">
              Projects
            </Link>

            <Link href="/about">
              About
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 Soumadeep Ghosh
          </p>
        </div>
      </div>
    </footer>
  );
}