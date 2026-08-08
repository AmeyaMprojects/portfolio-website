"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { spring, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Seconds to hold before starting. Keep small — long chains read as loading. */
  delay?: number;
  /** Travel distance in px. Negative pulls from above. */
  distance?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Scroll-triggered entrance.
 *
 * Under `prefers-reduced-motion` this degrades to a cross-fade rather than
 * disappearing entirely — the reveal still communicates "this is new", it
 * just stops moving the reader's field of view.
 */
export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ delay = 0, distance = 16, className, children, as = "div", ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const Component = motion[as] as typeof motion.div;

    return (
      <Component
        ref={ref}
        className={cn(className)}
        initial={{ opacity: 0, y: reduceMotion ? 0 : distance }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: reduceMotion
            ? { duration: 0.2, ease: "easeOut", delay }
            : { ...spring.reveal, delay },
        }}
        viewport={viewportOnce}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Reveal.displayName = "Reveal";
