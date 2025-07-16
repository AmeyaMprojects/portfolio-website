"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe, 
  Code, 
  Database, 
  Shield, 
  GitBranch, 
  Server, 
  Palette, 
  Zap,
  FileCode,
  Layers,
  CloudCog,
  Terminal,
  Wrench,
  Eye,
  Lock,
  AlertTriangle,
  HardDrive,
  Network,
  Monitor,
  Settings,
  Users,
  Lightbulb,
  Target
} from "lucide-react";

const skills = {
  Frontend: [
    { name: "HTML5", icon: Globe },
    { name: "CSS", icon: Palette },
    { name: "JavaScript", icon: Code },
    { name: "TypeScript", icon: FileCode },
    { name: "React.js", icon: Layers },
    { name: "Next.js", icon: Zap },
    { name: "Tailwind CSS", icon: Palette },
    // { name: "Shadcn/ui", icon: Monitor },
    // { name: "Redux", icon: Settings },
  ],
  Backend: [
    { name: "Node.js", icon: Server },
    { name: "Express.js", icon: Server },
    { name: "Python", icon: Code },
    { name: "Django", icon: Server },
    { name: "Flask", icon: Server },
    { name: "RESTful APIs", icon: Network },
    // { name: "GraphQL", icon: Network },
    // { name: "PostgreSQL", icon: Database },
    // { name: "MongoDB", icon: Database },
    { name: "SQL", icon: Database },
  ],
  Cybersecurity: [
    { name: "Nist CSF 2.0", icon: Shield },
    { name: "Web Application Security", icon: Lock },
    { name: "Nist AI rmf", icon: Shield },
    { name: "Vulnerability Assessment", icon: Eye },
    { name: "Incident Response", icon: AlertTriangle },
    // { name: "Cryptography", icon: Lock },
    { name: "SIEM", icon: Monitor },
    // { name: "Firewalls", icon: Shield },
  ],
  "Tools & Skills": [
    { name: "Git", icon: GitBranch },
    // { name: "GitHub", icon: GitBranch },
    { name: "Docker", icon: HardDrive },
    // { name: "AWS (EC2, S3, Lambda)", icon: CloudCog },
    // { name: "Netlify", icon: CloudCog },
    // { name: "Vercel", icon: CloudCog },
    // { name: "Jira", icon: Wrench },
    { name: "VS Code", icon: Terminal },
    // { name: "Postman", icon: Network },
    { name: "Leadership & Team Management", icon: Users },
    { name: "Problem Solving", icon: Lightbulb },
    { name: "Strategic Thinking", icon: Target },
  ],
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 px-4 bg-futures-5/10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-futures-1 mb-12">
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card key={category} className="bg-card shadow-lg border-futures-5/30 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-futures-2">{category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {skillList.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="bg-futures-4/20 text-futures-1 hover:bg-futures-4/30 transition-colors px-3 py-1 rounded-full text-sm flex items-center gap-1 w-full justify-start"
                    >
                      <IconComponent size={14} className="shrink-0" />
                      {skill.name}
                    </Badge>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;