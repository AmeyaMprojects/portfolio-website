"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/apple/Reveal";
import { Section } from "@/components/apple/Section";
import { SurfaceCard } from "@/components/apple/SurfaceCard";
import { RESUME_FILE, RESUME_DOWNLOAD_NAME } from "@/lib/resume";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  location: string;
  date: string;
  description: string[];
  /** Short factual notes — grades, coursework. Rendered as quiet metadata. */
  meta?: string[];
}

/** Reverse chronological: the most recent thing is what people came to read. */
const timelineData: TimelineItemProps[] = [
  {
    title: "Chair, IEEE Computational Intelligence Society",
    subtitle: "MIT Bengaluru Student Chapter",
    location: "Bengaluru, India",
    date: "Sep 2025 — Present",
    description: [
      "Lead a 15+ member student technical chapter, setting strategy and overseeing execution of workshops and technical sessions on AI and cybersecurity for 200+ attendees.",
      "Own budget planning, cross-team coordination, and stakeholder communication for chapter initiatives.",
    ],
  },
  {
    title: "Intern",
    subtitle: "Mastek Ltd.",
    location: "Mumbai, India",
    date: "Jun — Aug 2025 · Jun — Jul 2026",
    description: [
      "Worked on a production-grade evaluation pipeline for an AI incident-resolution system, benchmarking embedding strategies and Azure AI Search hybrid retrieval to improve similar-incident matching quality on real support data.",
      "Developed multi-node LLM agents using LangChain and LangGraph, including a production blog-writing agent orchestrating a three-node pipeline (research, draft, edit).",
      "Conducted an end-to-end security assessment of a production web application against NIST CSF and ISO 27001, designing standardised audit checklists later adopted across multiple engagements.",
    ],
  },
  {
    title: "B.Tech. in Computer Science (Data Science)",
    subtitle: "Manipal Institute of Technology",
    location: "Bengaluru, India",
    date: "Expected May 2028",
    description: [],
    meta: [
      "CGPA 8.4 / 10",
      "Coursework: Data Structures & Algorithms, Probability & Statistics, Object-Oriented Programming, Discrete Mathematics",
    ],
  },
];

/**
 * Timeline.
 *
 * A single continuous rail on the left at every breakpoint. The centred,
 * alternating timeline is a common pattern, but it forces the eye to
 * zig-zag and collapses awkwardly on narrow screens — one column reads
 * faster and behaves identically everywhere.
 */
const ResumeSection = () => {
  return (
    <Section
      id="resume"
      eyebrow="Journey"
      title="Where I've been"
      description="Roles, study, and the work that shaped how I build."
      tone="raised"
    >
      <ol className="relative ml-1 border-l border-border pl-8 sm:pl-10">
        {timelineData.map((item, index) => (
          <Reveal
            as="li"
            key={item.title}
            delay={index * 0.05}
            className="relative pb-10 last:pb-0"
          >
            {/* The node sits on the rail, ringed in the section colour so the
                line appears to pass behind it rather than stop at it. */}
            <span
              className="absolute -left-[2.3rem] top-1.5 h-2.5 w-2.5 rounded-full bg-blue ring-4 ring-surface sm:-left-[2.8rem]"
              aria-hidden
            />

            <SurfaceCard interactive className="p-6 sm:p-7">
              {/* Date and place are the same kind of fact, so they share a line
                  and a weight instead of stacking into a third hierarchy. */}
              <p className="type-caption mb-2 text-subtle">
                {item.date} · {item.location}
              </p>
              <h3 className="type-headline text-foreground">{item.title}</h3>
              <p className="type-caption mt-1 text-blue">{item.subtitle}</p>

              {item.description.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {item.description.map((desc) => (
                    <li
                      key={desc}
                      className="type-body relative pl-4 text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-subtle"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>
              )}

              {item.meta && (
                <dl className="mt-4 space-y-1.5">
                  {item.meta.map((line) => (
                    <dd key={line} className="type-body text-muted-foreground">
                      {line}
                    </dd>
                  ))}
                </dl>
              )}
            </SurfaceCard>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1} className="mt-12">
        <Button asChild size="lg" variant="secondary">
          <a href={RESUME_FILE} download={RESUME_DOWNLOAD_NAME}>
            <Download className="h-4 w-4" />
            Download résumé
          </a>
        </Button>
      </Reveal>
    </Section>
  );
};

export default ResumeSection;
