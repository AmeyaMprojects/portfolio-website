"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Braces,
  Boxes,
  Cloud,
  Code,
  Container,
  Database,
  FileSearch,
  GitBranch,
  LineChart,
  Network,
  Server,
  Shield,
  ShieldAlert,
  Sigma,
  Table2,
  Terminal,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/apple/Reveal";
import { Section } from "@/components/apple/Section";
import { SurfaceCard } from "@/components/apple/SurfaceCard";
import { spring, staggerContainer, revealVariants, viewportOnce } from "@/lib/motion";

type Skill = { name: string; icon: LucideIcon };

/** Grouped the way the résumé groups them, so the two documents agree. */
const skills: Record<string, Skill[]> = {
  Languages: [
    { name: "Python", icon: Code },
    { name: "JavaScript", icon: Braces },
    { name: "SQL", icon: Database },
    { name: "C++", icon: Terminal },
  ],
  "Quantitative & ML": [
    { name: "Scikit-learn", icon: Sigma },
    { name: "Pandas", icon: Table2 },
    { name: "NumPy", icon: BarChart3 },
    { name: "XGBoost", icon: TrendingUp },
    { name: "Regression modelling", icon: LineChart },
    { name: "Statistical analysis", icon: Sigma },
  ],
  "Frameworks & tools": [
    { name: "React", icon: Boxes },
    { name: "Node.js", icon: Server },
    { name: "FastAPI", icon: Network },
    { name: "AWS", icon: Cloud },
    { name: "Git", icon: GitBranch },
    { name: "LangChain / LangGraph", icon: Container },
  ],
  "Risk & compliance": [
    { name: "NIST CSF", icon: Shield },
    { name: "ISO 27001", icon: Shield },
    { name: "Threat modelling", icon: ShieldAlert },
    { name: "Security audits", icon: FileSearch },
  ],
};

/**
 * Skills.
 *
 * Grouped, plain, and unranked. Proficiency bars are a fiction — nobody can
 * defend "React, 87%" — so this states what's in the toolbox and stops there.
 */
const SkillsSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      description="The stack I reach for, and the frameworks I audit against."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(skills).map(([category, skillList], index) => (
          <Reveal key={category} delay={index * 0.05} className="h-full">
            <SurfaceCard interactive className="h-full p-6">
              <h3 className="type-caption mb-4 text-subtle">{category}</h3>
              <motion.ul
                className="space-y-3"
                variants={reduceMotion ? undefined : staggerContainer()}
                initial={reduceMotion ? undefined : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={viewportOnce}
              >
                {skillList.map(({ name, icon: Icon }) => (
                  <motion.li
                    key={name}
                    variants={reduceMotion ? undefined : revealVariants}
                    className="group flex items-start gap-2.5"
                  >
                    <motion.span
                      className="mt-0.5 shrink-0"
                      whileHover={!reduceMotion ? { y: -1, scale: 1.08 } : undefined}
                      transition={spring.snap}
                    >
                      <Icon size={16} className="text-blue" aria-hidden />
                    </motion.span>
                    <span className="text-[0.9375rem] leading-snug tracking-[-0.004em] text-foreground">
                      {name}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </SurfaceCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-8">
        <p className="type-body text-muted-foreground">
          Outside the stack: financial markets, sports analytics, and applied AI.
        </p>
      </Reveal>
    </Section>
  );
};

export default SkillsSection;
