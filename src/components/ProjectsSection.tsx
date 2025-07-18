"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubLink: string;
  liveDemoLink?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubLink,
  liveDemoLink,
}) => {
  return (
    <Card className="bg-card shadow-lg border-futures-5/30 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <CardHeader>
        <CardTitle className="text-2xl text-futures-2">{title}</CardTitle>
        <CardDescription className="text-foreground/80">
          {technologies.join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 pt-4">
        <Button asChild className="bg-futures-1 hover:bg-futures-2 text-white">
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> GitHub
          </a>
        </Button>
        {liveDemoLink && (
          <Button asChild variant="outline" className="border-futures-1 text-futures-1 hover:bg-futures-1/10">
            <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const projects: ProjectProps[] = [
{
    title: "Auditing Dashboard",
    description: "A React-based auditing prototype with TypeScript implementation featuring modular components for audit sections, evidence inputs, and status cards. Includes dynamic rendering of audit questions from structured schema, evidence upload functionality, and multi-step routing logic with responsive cross-device compatibility.",
    technologies: ["React", "TypeScript", "CSS Grid", "CSS Flexbox", "Component Architecture", "Responsive Design"],
    imageUrl: "/audit.png",
    githubLink: "https://github.com/AmeyaMprojects/auditing-dashboard",
    liveDemoLink: "https://auditing-app.vercel.app/"
  },
  {
    title: "Crypto Dashboard",
    description: "A real-time cryptocurrency tracking dashboard built with React and TypeScript. Features live price monitoring, portfolio tracking, market trends visualization, and price alerts. Integrates with multiple crypto APIs to provide comprehensive market data and trading insights with responsive charts and analytics.",
    technologies: ["React", "TypeScript", "Chart.js", "Crypto APIs", "Tailwind CSS", "Real-time Data"],
    imageUrl: "/cypto.jpg",
    githubLink: "https://github.com/AmeyaMprojects/crypto-dashboard",
    liveDemoLink: "https://crypto-dashboard-woad-delta.vercel.app/"
  },
  {
    title: "Minimalist Todo App",
    description: "A simple and clean todo list app designed to help you stay organized with a minimal interface. Features task creation, editing, and deletion with local storage support for persistent data.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    imageUrl: "/minimalist.png",
    githubLink: "https://github.com/AmeyaMprojects/to_Do",
    liveDemoLink: "https://zaptaskhub.vercel.app/"
  }


];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-futures-1 mb-12">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* Optional: Project Filters can be added here later */}
        {/* <div className="mt-12 text-center">
          <Button variant="outline" className="border-futures-1 text-futures-1 hover:bg-futures-1/10">
            View All Projects
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default ProjectsSection;