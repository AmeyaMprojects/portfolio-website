"use client";

import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/motion";
import { RESUME_FILE, RESUME_DOWNLOAD_NAME } from "@/lib/resume";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ameya-mhatre-553003307/",
    icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/AmeyaMprojects", icon: Github },
  { label: "Email", href: "mailto:ameyam.projects@gmail.com", icon: Mail },
];

/**
 * Hero.
 *
 * One idea, stated large. The ambient field behind it is the only decorative
 * element on the page and it is deliberately low-contrast and slow — it sets
 * a mood without asking to be looked at. Everything else is type.
 */
const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  /* Gentle parallax: the backdrop lags the content slightly, which reads as
     depth. Disabled entirely under reduced motion — a full-viewport moving
     background is exactly what that setting exists to suppress. */
  const fieldY = useTransform(scrollY, [0, 600], [0, 90]);
  const fieldOpacity = useTransform(scrollY, [0, 500], [1, 0.25]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-24 pt-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reduceMotion ? undefined : { y: fieldY, opacity: fieldOpacity }}
        aria-hidden
      >
        <div className="ambient-field" />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduceMotion ? { duration: 0.25 } : spring.move}
          className="mb-8"
        >
          <img
            src="/pfp.jpg"
            alt="Ameya Mhatre"
            className="h-24 w-24 rounded-full object-cover shadow-md ring-1 ring-border md:h-28 md:w-28"
            width={112}
            height={112}
            fetchPriority="high"
          />
        </motion.div>

        <motion.h1
          className="type-display text-foreground"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0.25 } : { ...spring.reveal, delay: 0.06 }}
        >
          Ameya Mhatre
        </motion.h1>

        <motion.p
          className="type-lead mt-5 max-w-xl text-balance text-muted-foreground"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0.25 } : { ...spring.reveal, delay: 0.12 }}
        >
          I build multi-agent LLM systems and quantitative tools, and I audit
          them against NIST CSF and ISO 27001. Computer Science (Data Science) at
          Manipal Institute of Technology, Bengaluru.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0.25 } : { ...spring.reveal, delay: 0.18 }}
        >
          <Button size="lg" onClick={() => scrollTo("projects")}>
            View work
          </Button>
          {/* Downloading a file is a different kind of act from navigating, so
              it reads as a quieter, secondary control rather than a third
              equally-weighted call to action. */}
          <Button asChild size="lg" variant="secondary">
            <a href={RESUME_FILE} download={RESUME_DOWNLOAD_NAME}>
              <Download className="h-4 w-4" />
              Résumé
            </a>
          </Button>
          <Button size="lg" variant="ghost" onClick={() => scrollTo("contact")}>
            Get in touch
          </Button>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.28 }}
        >
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="pressable-sm flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 ease-apple hover:bg-secondary hover:text-foreground"
            >
              <Icon size={19} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Directional hint: the arrow points where the gesture goes next. */}
      <motion.button
        type="button"
        onClick={() => scrollTo("resume")}
        className="pressable-sm absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-medium text-subtle transition-colors duration-200 hover:text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <ArrowDown className="h-3.5 w-3.5" />
        Scroll
      </motion.button>
    </section>
  );
};

export default HeroSection;
