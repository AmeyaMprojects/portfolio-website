"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const HeroSection = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center py-16 px-4 bg-gradient-to-b from-background to-futures-5/10">
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 border-futures-4 shadow-lg">
        {/* Placeholder for your professional photo */}
        <img
          src="https://via.placeholder.com/192" // Replace with your actual photo URL
          alt="Your Professional Photo"
          className="w-full h-full object-cover"
        />
        {/* Optional: Placeholder for your logo */}
        {/* <div className="absolute bottom-0 right-0 bg-futures-1 p-1 rounded-full">
          <img src="/your-logo.png" alt="Your Logo" className="w-8 h-8" />
        </div> */}
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-futures-1 mb-4 leading-tight">
        Hi, I'm <span className="text-futures-4">[Your Name]</span>,
        <br className="hidden sm:block" /> a passionate software engineer.
      </h1>
      <p className="text-lg md:text-xl text-foreground max-w-2xl mb-8">
        Building innovative web applications and solving complex problems with code.
        I specialize in full-stack development and have a keen interest in cybersecurity.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button
          className="bg-futures-1 hover:bg-futures-2 text-white px-6 py-3 text-lg rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          onClick={() => handleScrollTo("projects")}
        >
          View My Work
        </Button>
        <Button
          variant="outline"
          className="border-futures-1 text-futures-1 hover:bg-futures-1/10 px-6 py-3 text-lg rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          onClick={() => handleScrollTo("contact")}
        >
          Get in Touch
        </Button>
      </div>

      <div className="flex space-x-6">
        <a
          href="https://linkedin.com/in/yourprofile" // Replace with your LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-futures-3 hover:text-futures-1 transition-colors"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={28} />
        </a>
        <a
          href="https://github.com/yourprofile" // Replace with your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-futures-3 hover:text-futures-1 transition-colors"
          aria-label="GitHub Profile"
        >
          <Github size={28} />
        </a>
        <a
          href="https://twitter.com/yourprofile" // Replace with your Twitter URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-futures-3 hover:text-futures-1 transition-colors"
          aria-label="Twitter Profile"
        >
          <Twitter size={28} />
        </a>
        <a
          href="mailto:youremail@example.com" // Replace with your email address
          className="text-futures-3 hover:text-futures-1 transition-colors"
          aria-label="Email Address"
        >
          <Mail size={28} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;