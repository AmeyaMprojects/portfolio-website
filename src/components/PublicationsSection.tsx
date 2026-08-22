"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/apple/Reveal";
import { Section } from "@/components/apple/Section";
import { SurfaceCard } from "@/components/apple/SurfaceCard";
import publications from "@/data/publications.json";

const SUBSTACK_URL = "https://ameyamhatre.substack.com";

interface PublicationProps {
  title: string;
  description: string;
  publishDate: string;
  url: string;
}

const PublicationCard: React.FC<PublicationProps & { index: number }> = ({
  title,
  description,
  publishDate,
  url,
  index,
}) => (
  <Reveal delay={index * 0.06} className="h-full">
    {/* The whole card is the link. One target beats a card with a small
        "read more" hidden at the bottom of it. */}
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full rounded-card"
    >
      <SurfaceCard interactive className="group flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="type-caption rounded-full bg-blue/10 px-2.5 py-1 text-blue">
            Substack
          </span>
          <span className="type-caption text-subtle">{publishDate}</span>
        </div>

        <h3 className="type-headline text-balance text-foreground">{title}</h3>
        <p className="type-body mt-2.5 flex-1 text-muted-foreground">{description}</p>

        <span className="mt-5 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-blue">
          Read on Substack
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
      description="Notes on markets, research, and the occasional stray thought — from my Substack."
      tone="raised"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publications.map((publication, index) => (
          <PublicationCard key={publication.url} {...publication} index={index} />
        ))}
      </div>

      <Reveal delay={0.12} className="mt-12">
        <Button asChild variant="secondary">
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
            Read on Substack
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </Reveal>
    </Section>
  );
};

export default PublicationsSection;
