"use client";

import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/apple/Reveal";
import { Section } from "@/components/apple/Section";
import { SurfaceCard } from "@/components/apple/SurfaceCard";

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubLink: string;
  liveDemoLink?: string;
}

const projects: ProjectProps[] = [
  {
    title: "Multi-Market Swing Trading Screener",
    description:
      "An automated multi-factor screening engine for cross-market equity analysis. Combines volatility-adjusted pricing, momentum indicators, and a probabilistic scoring matrix to surface mean-reversion and trend-continuation setups. Risk is ATR-anchored — volatility-based stops and multi-tiered profit targets instead of static percentages — with a minimum risk-to-reward threshold enforced before any candidate validates.",
    technologies: ["Python", "FastAPI", "AWS", "Quantitative Modeling"],
    imageUrl: "/swing-screener.png",
    githubLink: "https://github.com/AmeyaMprojects/swing-screener",
    liveDemoLink: "https://s501e59h91.execute-api.ap-south-1.amazonaws.com",
  },
  {
    title: "Indian IPO Analyzer",
    description:
      "A multi-agent financial pipeline orchestrating five specialist agents — fundamentals, valuation, sentiment, risk profiling, synthesis — over live IPO data. Financial ratios (P/E, P/B, ROE, ROCE, debt/equity, CAGR) are computed deterministically and unit-tested, with LLM output confined to explanation, so every number in a report is independently verifiable and traceable to source.",
    technologies: ["Python", "LangGraph", "Gemini", "Web Scraping"],
    imageUrl: "/ipo-analyzer.png",
    githubLink: "https://github.com/AmeyaMprojects/ipo_analyzer",
    liveDemoLink: "https://ipoanalyzer.streamlit.app/",
  },
  {
    title: "NBA Contract Analyzer",
    description:
      "An end-to-end pipeline modelling real 2023 CBA mechanics — rookie scale, max tiers, supermax, Bird rights, the luxury-tax apron — to value contracts against on-court performance rather than raw salary. A ridge-regression market-value model over player-season statistics quantifies surplus and deficit as a share of the salary cap across 101 players and 30 teams.",
    technologies: ["Python", "Pandas", "Ridge Regression", "Web Scraping"],
    imageUrl: "/nba-contract-analyzer.png",
    githubLink: "https://github.com/AmeyaMprojects/Nba-Contract-Analyzer",
    liveDemoLink: "https://ameyamprojects.github.io/Nba-Contract-Analyzer/",
  },
];

const ProjectCard: React.FC<ProjectProps & { index: number }> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubLink,
  liveDemoLink,
  index,
}) => (
  <Reveal delay={index * 0.06} className="h-full">
    <SurfaceCard interactive className="flex h-full flex-col overflow-hidden">
      {/* Not every project has a screenshot worth showing. A card without one
          closes up rather than reserving an empty grey box. */}
      {imageUrl && (
        <div className="aspect-[16/10] overflow-hidden border-b border-border/70 bg-secondary">
          <img
            src={imageUrl}
            alt={`${title} interface`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="type-headline text-balance text-foreground">{title}</h3>
        <p className="type-body mt-2.5 flex-1 text-muted-foreground">{description}</p>

        {/* Technologies are metadata, not actions — they read as quiet text
            rather than as a row of tappable-looking chips. */}
        <p className="type-caption mt-5 text-subtle">{technologies.join(" · ")}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {liveDemoLink && (
            <Button asChild size="sm">
              <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                Live demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          )}
          <Button asChild size="sm" variant="secondary">
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Code
            </a>
          </Button>
        </div>
      </div>
    </SurfaceCard>
  </Reveal>
);

const ProjectsSection = () => {
  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Things I've built"
      description="Agent pipelines and quantitative tools, built end to end — data ingestion through to the interface."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default ProjectsSection;
