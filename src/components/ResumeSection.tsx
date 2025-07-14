"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string[];
}

const timelineData: TimelineItemProps[] = [
  {
    title: "Senior Software Engineer",
    subtitle: "Tech Solutions Inc.",
    date: "Jan 2022 - Present",
    description: [
      "Led a team of 5 engineers in developing a scalable microservices architecture for a new customer analytics platform, improving data processing efficiency by 40%.",
      "Implemented robust security protocols, reducing potential vulnerabilities by 25% through regular code audits and penetration testing.",
      "Mentored junior developers, fostering a collaborative environment and improving team code quality by establishing best practices.",
    ],
  },
  {
    title: "Software Developer",
    subtitle: "Innovate Systems",
    date: "Aug 2019 - Dec 2021",
    description: [
      "Developed and maintained core features for a SaaS product using React and Node.js, contributing to a 15% increase in user engagement.",
      "Optimized database queries and API endpoints, resulting in a 30% reduction in response times.",
      "Collaborated with product managers and UX designers to translate requirements into technical specifications.",
    ],
  },
  {
    title: "B.Tech.. in Computer Science",
    subtitle: "Manipal institute of Technology",
    date: "Sept 2024 - May 2028",
    description: [
      "Graduated with honors, specializing in Data Science and Cybersecurity.",
      "Completed a capstone project on secure data transmission protocols.",
    ],
  },
];

const ResumeSection = () => {
  return (
    <section id="resume" className="py-16 px-4 bg-futures-5/10 relative overflow-hidden">
      {/* Galaxy Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars Layer 1 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
        
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Larger Twinkling Stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-300/80 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Galaxy Nebula Effect */}
        <div 
          className="absolute inset-0 animate-pulse" 
          style={{ 
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 50%, rgba(37, 99, 235, 0.1) 100%)',
            animationDuration: '8s' 
          }}
        ></div>
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10 container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-futures-1 mb-12">
          My Resume
        </h2>

        <div className="relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:h-full before:w-0.5 before:bg-futures-4/50 before:rounded-full">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="mb-8 flex flex-col md:flex-row items-start md:items-center w-full"
            >
              <div className="md:w-1/2 md:pr-8 md:text-right relative">
                <div className="absolute left-2 md:left-auto md:right-[-1.25rem] top-2 w-4 h-4 bg-futures-1 rounded-full z-10 border-2 border-background"></div>
                <Card className="bg-card shadow-lg border-futures-5/30 transition-all duration-300 hover:shadow-xl w-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-futures-2">{item.title}</CardTitle>
                    <p className="text-sm text-foreground/70">{item.subtitle}</p>
                    <p className="text-xs text-futures-3">{item.date}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-foreground leading-relaxed">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="md:w-1/2 md:pl-8">
                {/* This div is intentionally left empty for layout balance on larger screens */}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-futures-1 hover:bg-futures-2 text-white px-6 py-3 text-lg rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            <a href="/your-resume.pdf" download="Your_Name_Resume.pdf"> {/* Replace with your actual resume PDF path */}
              <Download className="mr-2 h-5 w-5" /> Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;