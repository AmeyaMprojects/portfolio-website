"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/apple/Reveal";
import { Section } from "@/components/apple/Section";
import { SurfaceCard } from "@/components/apple/SurfaceCard";

interface PublicationProps {
  title: string;
  description: string;
  platform: string;
  publishDate: string;
  linkedinUrl: string;
  category: string;
}

const publications: PublicationProps[] = [
  {
    title: "Computational Intelligence in Sports: The Quest for the Perfect Call",
    description:
      "How CI reshapes sports officiating — trajectory analysis behind Hawk-Eye, automated event detection for VAR, and goal-line technology built on sensor fusion.",
    platform: "LinkedIn",
    publishDate: "Oct 2024",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ideal-call-behind-ai-revolution-sportsofficiating-ieee-cis-mitblr-pfbre",
    category: "Computational Intelligence",
  },
  {
    title: "Computational Intelligence Through Anime and Cinema",
    description:
      "Fiction as a cultural laboratory for AI: neural networks through J.A.R.V.I.S., reinforcement learning through Edge of Tomorrow, and the ethical frontier of Ghost in the Shell.",
    platform: "LinkedIn",
    publishDate: "Sep 2024",
    linkedinUrl:
      "https://www.linkedin.com/pulse/framed-realities-exploring-ci-anime-hollywood-ieee-cis-mitblr-dhlje/",
    category: "Computational Intelligence",
  },
  {
    title: "Building Scalable Audit Systems: A Technical Perspective",
    description:
      "Designing audit systems that hold up under load — database design, real-time monitoring, and compliance automation.",
    platform: "LinkedIn",
    publishDate: "Jul 2024",
    // TODO: still pointing at a placeholder URL.
    linkedinUrl: "https://www.linkedin.com/pulse/your-article-url",
    category: "System Design",
  },
];

const PublicationCard: React.FC<PublicationProps & { index: number }> = ({
  title,
  description,
  publishDate,
  linkedinUrl,
  category,
  index,
}) => (
  <Reveal delay={index * 0.06} className="h-full">
    {/* The whole card is the link. One target beats a card with a small
        "read more" hidden at the bottom of it. */}
    <a
      href={linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full rounded-card"
    >
      <SurfaceCard interactive className="group flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="type-caption rounded-full bg-blue/10 px-2.5 py-1 text-blue">
            {category}
          </span>
          <span className="type-caption text-subtle">{publishDate}</span>
        </div>

        <h3 className="type-headline text-balance text-foreground">{title}</h3>
        <p className="type-body mt-2.5 flex-1 text-muted-foreground">{description}</p>

        <span className="mt-5 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-blue">
          Read on LinkedIn
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-apple group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </SurfaceCard>
    </a>
  </Reveal>
);

const PublicationsSection = () => {
  return (
    <Section
      id="publications"
      eyebrow="Writing"
      title="Articles & publications"
      description="Notes on computational intelligence, security, and system design."
      tone="raised"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publications.map((publication, index) => (
          <PublicationCard key={publication.title} {...publication} index={index} />
        ))}
      </div>

      <Reveal delay={0.12} className="mt-12">
        <Button asChild variant="secondary">
          <a
            href="https://www.linkedin.com/in/ameya-mhatre-553003307/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </Reveal>
    </Section>
  );
};

export default PublicationsSection;
