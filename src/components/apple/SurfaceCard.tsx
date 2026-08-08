"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SurfaceCardProps = HTMLMotionProps<"div"> & {
  /** Lift on hover. Off for cards that aren't a single click target. */
  interactive?: boolean;
};

/**
 * The one card in the system.
 *
 * Depth comes from a hairline plus a layered shadow, not from a heavy border.
 * The hover lift is a spring rather than a CSS transition so it can be
 * interrupted and reversed mid-flight — move the pointer away halfway down
 * and it turns around from where it actually is, with no jump.
 */
export const SurfaceCard = React.forwardRef<HTMLDivElement, SurfaceCardProps>(
  ({ className, interactive = false, children, ...props }, ref) => {
    const reduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-card border border-border/70 bg-card text-card-foreground shadow-sm",
          "transition-colors duration-200",
          interactive && "hover:border-border",
          className,
        )}
        whileHover={
          interactive && !reduceMotion
            ? { y: -4, boxShadow: "var(--shadow-lg)" }
            : undefined
        }
        transition={spring.snap}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
SurfaceCard.displayName = "SurfaceCard";
