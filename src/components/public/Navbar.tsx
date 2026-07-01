"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/common/ThemeToggle";

const LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [visible, setVisible] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const current = window.scrollY;

      if (current < 20) {
        setVisible(true);
      } else if (current > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(current);
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const activeLink = useMemo(() => pathname, [pathname]);

  return (
    <>
      <motion.header
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : -110,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-4 z-[100]"
      >
        <div className="container mx-auto px-4">
          <div
            className="
relative mx-auto flex h-16 max-w-7xl items-center justify-between
rounded-2xl
border border-border/80
bg-neutral-50/90
dark:bg-background/65
backdrop-blur-3xl
shadow-[0_10px_40px_rgba(0,0,0,0.08)]
dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)]
ring-1 ring-black/5
dark:ring-white/10
px-4
"
          >
            {/* Decorative glow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 pointer-events-none" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

            {/* Logo */}

            <Link href="/" className="relative z-10 flex items-center gap-3">
              <div
                className="
flex h-10 w-10 items-center justify-center
rounded-xl
bg-gradient-to-br
from-primary
to-primary/80
text-primary-foreground
shadow-lg
shadow-primary/20
"
              >
                <Sparkles className="h-5 w-5" />
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  RBAC CMS
                </p>

                <p className="text-xs text-muted-foreground">
                  Developer Journal
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}

            <nav
              className="
relative hidden lg:flex items-center gap-2
rounded-full
border border-border
bg-muted/80
dark:bg-muted/30
backdrop-blur-xl
p-1
shadow-sm
"
            >
              {LINKS.map((item) => {
                const active = activeLink === item.href;

                return (
                  <Link key={item.href} href={item.href} className="relative">
                    {active && (
                      <motion.span
                        layoutId="navbar-pill"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                        }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}

                    <span
                      className={`relative z-10 flex items-center rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side */}

            <div className="relative z-10 flex items-center gap-2">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              <Button asChild className="hidden rounded-full px-5 md:flex">
                <Link href="/login" className="group flex items-center gap-2">
                  Admin
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* Mobile */}

              <Button
                size="icon"
                variant="ghost"
                className="rounded-xl lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu continues in Part 2 */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed left-4 right-4 top-24 z-[90] lg:hidden"
          >
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/80 p-4 shadow-2xl backdrop-blur-2xl supports-[backdrop-filter]:bg-background/70">
              <nav className="space-y-1">
                {LINKS.map((item, index) => {
                  const active = pathname === item.href;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                          active
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        <span>{item.label}</span>

                        {active && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="h-2 w-2 rounded-full bg-primary-foreground"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="my-5 h-px bg-border" />

              <div className="flex items-center justify-between">
                <ThemeToggle />

                <Button asChild className="rounded-full">
                  <Link href="/login" className="group flex items-center gap-2">
                    Admin Login
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
