"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ameya-mhatre-553003307/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/AmeyaMprojects", icon: Github },
  { label: "Email", href: "mailto:ameyam.projects@gmail.com", icon: Mail },
];

/**
 * Footer. Quiet close: mark, links, year. Nothing that competes with the
 * contact section immediately above it.
 */
const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const logo =
    mounted && resolvedTheme === "dark"
      ? "/logo-removebg-preview.png"
      : "/logo-dark.png";

  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <img src={logo} alt="Ameya Mhatre" className="h-9 w-auto opacity-80" />

        <div className="flex items-center gap-1">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="pressable-sm flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 ease-apple hover:bg-secondary hover:text-foreground"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p className="type-caption text-subtle">
          &copy; {new Date().getFullYear()} Ameya Mhatre
        </p>
      </div>
    </footer>
  );
};

export default Footer;
