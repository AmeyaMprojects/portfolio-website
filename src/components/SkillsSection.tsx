"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skills = {
  Frontend: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Shadcn/ui",
    "Redux",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "Flask",
    "RESTful APIs",
    "GraphQL",
    "PostgreSQL",
    "MongoDB",
    "SQL",
  ],
  "DevOps & Tools": [
    "Git",
    "GitHub",
    "Docker",
    "AWS (EC2, S3, Lambda)",
    "Netlify",
    "Vercel",
    "Jira",
    "VS Code",
    "Postman",
  ],
  Cybersecurity: [
    "Network Security",
    "Web Application Security",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Incident Response",
    "Cryptography",
    "SIEM",
    "Firewalls",
  ],
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 px-4 bg-futures-5/10">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-futures-1 mb-12">
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card key={category} className="bg-card shadow-lg border-futures-5/30 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-futures-2">{category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-futures-4/20 text-futures-1 hover:bg-futures-4/30 transition-colors px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;