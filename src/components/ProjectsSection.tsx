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
    title: "E-commerce Platform",
    description: "A full-stack e-commerce application with user authentication, product listings, shopping cart functionality, and payment integration. Built with a focus on scalability and user experience.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
    imageUrl: "https://via.placeholder.com/400x250/3D9DD9/FFFFFF?text=E-commerce+App",
    githubLink: "https://github.com/yourprofile/ecommerce-platform",
    liveDemoLink: "https://ecommerce-demo.example.com",
  },
  {
    title: "Cybersecurity Dashboard",
    description: "An interactive dashboard for visualizing network traffic, security alerts, and vulnerability scan results. Designed to provide a clear overview of an organization's security posture.",
    technologies: ["Python", "Flask", "React", "D3.js", "PostgreSQL", "Splunk API"],
    imageUrl: "https://via.placeholder.com/400x250/223542/FFFFFF?text=Security+Dashboard",
    githubLink: "https://github.com/yourprofile/security-dashboard",
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