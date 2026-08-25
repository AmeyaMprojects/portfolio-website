"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Names describe what's actually there — "Writing", not "Blog"; "Work", not "Home". */
const navItems = [
  { name: "Intro", href: "home" },
  { name: "Journey", href: "resume" },
  { name: "Work", href: "projects" },
  { name: "Writing", href: "publications" },
  { name: "Skills", href: "skills" },
  { name: "Contact", href: "contact" },
];

/**
 * Floating translucent toolbar.
 *
 * Content scrolls *under* the bar rather than being pushed below an opaque
 * strip — the material is what tells you there's a layer above. The active
 * pill is a shared layout element, so moving between sections slides one
 * object rather than cross-fading two.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState("home");
  const [scrolled, setScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  React.useEffect(() => setMounted(true), []);

  /* Scroll spy. rootMargin biases the trigger line toward the upper third of
     the viewport so the highlight changes when a section *reads* as current,
     not when its first pixel appears. */
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    navItems.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setIsOpen(false);
  };

  const logo =
    mounted && resolvedTheme === "dark"
      ? "/logo1-removebg-preview.png"
      : "/logo1-dark.png";

  return (
    <>
      {/* Scroll edge: content dissolves as it passes under the toolbar instead
          of colliding with a hard divider. */}
      <div
        className={cn(
          "scroll-edge transition-opacity duration-300 ease-apple",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
        <nav
          className={cn(
            "mx-auto flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-1.5 pl-2 pr-1.5",
            "material-regular material-edge",
            "transition-shadow duration-300 ease-apple",
            scrolled ? "shadow-md" : "shadow-none",
          )}
        >
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="pressable-sm flex shrink-0 items-center rounded-full px-1.5 py-1"
            aria-label="Back to top"
          >
            <img
              src={logo}
              alt="Ameya Mhatre"
              className="h-7 w-auto"
              width={28}
              height={28}
            />
          </button>

          {/* Desktop */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "pressable-sm relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.004em]",
                  "transition-colors duration-200 ease-apple",
                  active === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active === item.href ? "true" : undefined}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.07]"
                    transition={reduceMotion ? { duration: 0 } : spring.snap}
                  />
                )}
                <span className="vibrant">{item.name}</span>
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="pressable-sm flex h-11 w-11 items-center justify-center rounded-full text-foreground md:hidden"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </nav>

        {/* Mobile sheet. It enters downward from the toolbar and leaves back up
            the same way — the panel belongs to the button that opened it, so
            the origin is anchored there rather than at the panel's centre. */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              className="mx-auto mt-2 w-full max-w-3xl origin-top overflow-hidden rounded-card material-thick material-edge shadow-lg md:hidden"
              initial={{ opacity: 0, height: 0, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: reduceMotion ? 1 : 0.98 }}
              transition={reduceMotion ? { duration: 0.18 } : spring.sheet}
            >
              <ul className="flex flex-col p-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.href)}
                      className={cn(
                        "pressable w-full rounded-lg px-4 py-3 text-left text-[1.0625rem] font-medium tracking-[-0.006em]",
                        active === item.href
                          ? "bg-foreground/[0.07] text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
