"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, BookOpen } from "lucide-react";

interface PublicationProps {
  title: string;
  description: string;
  platform: string;
  publishDate: string;
  linkedinUrl: string;
  category: string;
}

const PublicationCard: React.FC<PublicationProps> = ({
  title,
  description,
  platform,
  publishDate,
  linkedinUrl,
  category,
}) => {
  return (
    <Card className="bg-card shadow-lg border-futures-5/30 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-futures-1/20 text-futures-1 px-2 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {publishDate}
          </div>
        </div>
        <CardTitle className="text-xl text-futures-2 leading-tight">{title}</CardTitle>
        <CardDescription className="text-futures-1 font-medium">
          Published on {platform}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground/80 leading-relaxed mb-4">{description}</p>
        <Button asChild className="bg-futures-1 hover:bg-futures-2 text-white w-full">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Read on LinkedIn
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

const publications: PublicationProps[] = [
  {
    title: "Cybersecurity Best Practices for Modern Web Applications",
    description: "An in-depth analysis of contemporary cybersecurity threats and defensive strategies for web applications, covering OWASP Top 10, secure coding practices, and implementation of security frameworks.",
    platform: "LinkedIn",
    publishDate: "Sep 2024",
    linkedinUrl: "https://www.linkedin.com/pulse/your-article-url",
    category: "Cybersecurity"
  },
  {
    title: "The Future of React Development: TypeScript Integration",
    description: "Exploring the benefits of TypeScript in React applications, discussing type safety, developer experience improvements, and best practices for migrating existing projects.",
    platform: "LinkedIn",
    publishDate: "Aug 2024",
    linkedinUrl: "https://www.linkedin.com/pulse/your-article-url",
    category: "Development"
  },
  {
    title: "Building Scalable Audit Systems: A Technical Perspective",
    description: "A comprehensive guide to designing and implementing scalable audit systems, covering database design, real-time monitoring, and compliance automation strategies.",
    platform: "LinkedIn",
    publishDate: "Jul 2024",
    linkedinUrl: "https://www.linkedin.com/pulse/your-article-url",
    category: "System Design"
  }
];

const PublicationsSection = () => {
  return (
    <section id="publications" className="py-16 px-4 bg-futures-5/5 relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-futures-1/5 to-futures-3/5 opacity-50"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="mr-3 h-8 w-8 text-futures-1" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-futures-1 via-futures-2 to-futures-3 bg-clip-text text-transparent">
              Publications & Articles
            </h2>
          </div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Sharing insights and knowledge through technical articles on cybersecurity, development, and system design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication, index) => (
            <PublicationCard key={index} {...publication} />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-foreground/60 mb-4">Want to stay updated with my latest articles?</p>
          <Button 
            asChild 
            variant="outline" 
            className="border-futures-1 text-futures-1 hover:bg-futures-1/10"
          >
            <a 
              href="https://www.linkedin.com/in/ameya-mhatre-553003307/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Follow me on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;