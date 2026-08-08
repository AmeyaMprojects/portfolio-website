"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Alternating band so adjacent sections separate without drawing a rule. */
  tone?: "base" | "raised";
  className?: string;
  children: React.ReactNode;
};

/**
 * One section shell for the whole page.
 *
 * Consistency is the point: every section headline lands at the same size,
 * the same measure, and the same distance from its content, so the reader
 * learns the rhythm once and can then predict where things are.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  tone = "base",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 px-6 py-24 sm:py-32",
        tone === "raised" ? "bg-surface" : "bg-background",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-14 max-w-2xl">
          {eyebrow && (
            <Reveal>
              <p className="type-eyebrow mb-3 text-blue">{eyebrow}</p>
            </Reveal>
          )}
          <Reveal delay={0.04}>
            <h2 className="type-section text-foreground">{title}</h2>
          </Reveal>
          {description && (
            <Reveal delay={0.08}>
              <p className="type-lead mt-4 text-muted-foreground">{description}</p>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
