"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { spring } from "@/lib/motion";

/**
 * Light/dark switch.
 *
 * The two icons enter and exit along the same arc, so the sun leaves the way
 * the moon arrives. The page's own colour change is eased (see the
 * `.theme-transition` class) because an instant full-viewport brightness jump
 * is uncomfortable, especially going light in a dark room.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 360);
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="pressable-sm relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-foreground"
      aria-label={isDark ? "Switch to light appearance" : "Switch to dark appearance"}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: reduceMotion ? 0 : -60, scale: reduceMotion ? 1 : 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: reduceMotion ? 0 : 60, scale: reduceMotion ? 1 : 0.6 }}
          transition={reduceMotion ? { duration: 0.15 } : spring.snap}
          className="flex items-center justify-center"
        >
          {isDark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
