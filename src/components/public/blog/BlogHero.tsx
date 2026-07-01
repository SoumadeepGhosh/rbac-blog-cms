"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import BlogGlobe from "@/components/aceternity/globe-demo";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Tailwind CSS",
  "AI",
];

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-24">
      {/* Background */}

      <div className="absolute inset-0 -z-30 bg-background" />

      {/* Grid */}

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Top Glow */}

      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-primary" />

              <span className="text-sm font-medium text-muted-foreground">
                Developer Journal
              </span>
            </div>

            {/* Heading */}

            <h1 className="mt-8 text-balance text-5xl font-black leading-[1.05] tracking-tight md:text-6xl xl:text-7xl">
              Building better
              <span className="bg-gradient-to-r from-primary via-violet-500 to-sky-500 bg-clip-text text-transparent">
                {" "}
                software
              </span>
              <br />
              through thoughtful engineering.
            </h1>

            {/* Description */}

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              Discover practical articles, tutorials and engineering notes about
              building scalable applications with modern web technologies. Learn
              through real projects, architecture decisions, performance
              optimizations and production experiences.
            </p>

            {/* CTA */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8">
                Explore Articles
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <Link href="#articles">
                  Latest Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Technologies */}

            <div className="mt-12 flex flex-wrap gap-3">
              {technologies.map((item) => (
                <motion.div
                  whileHover={{
                    y: -4,
                    scale: 1.04,
                  }}
                  key={item}
                  className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-xl transition-all hover:border-primary/30 hover:text-foreground"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="relative hidden h-[620px] items-center justify-center lg:flex"
          >
            {/* Decorative Glow */}

            <div className="absolute inset-0 rounded-full bg-primary/10 blur-[100px]" />

            {/* Glass Ring */}

            <div className="absolute h-[540px] w-[540px] rounded-full border border-border/40 bg-background/20 backdrop-blur-sm" />

            {/* Globe */}

            <div className="relative z-10 scale-95">
              <BlogGlobe />
            </div>
            {/* Floating Blur Orb */}

            <div className="absolute -right-10 top-12 h-32 w-32 rounded-full bg-sky-500/10 blur-[80px]" />

            <div className="absolute -left-8 bottom-20 h-24 w-24 rounded-full bg-violet-500/10 blur-[70px]" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-background/40 to-background" />

      {/* Scroll Indicator */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.8,
        }}
        className="relative mt-14 flex justify-center"
      >
        <Link
          href="#articles"
          className="group flex flex-col items-center gap-3"
        >
          <span className="text-sm font-medium tracking-wide text-muted-foreground transition-colors group-hover:text-foreground">
            Browse latest articles
          </span>

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-xl transition-all group-hover:border-primary/40"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path d="M12 5v14" />
              <motion.path d="m19 12-7 7-7-7" />
            </motion.svg>
          </motion.div>
        </Link>
      </motion.div>

      {/* Bottom Divider */}

      <div className="container mx-auto mt-20 px-4">
        <div className="relative">
          <div className="h-px w-full bg-border" />

          <div className="absolute left-1/2 top-1/2 h-px w-60 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
