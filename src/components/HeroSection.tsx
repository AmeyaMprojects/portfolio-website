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
    <section
      id="home"
      className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center py-16 px-4 bg-gradient-to-b from-background to-futures-5/10 relative overflow-hidden"
    >
      {/* Background animation effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="jumbo absolute -inset-[10px] opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Profile Photo */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 border-futures-4 shadow-lg">
          <img
            src="./pfp.jpg" // Replace with your actual photo URL
            alt="Your Professional Photo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-futures-1 mb-4 leading-tight">
          Hi, I'm <span className="text-futures-4">Ameya Mhatre</span>,
          <br className="hidden sm:block" /> a passionate software engineer.
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-foreground max-w-2xl mb-8">
          Passionate full stack developer with a knack for problem-solving and
          innovation. 2nd year undergraduate at<span className="text-futures-4"> 
            &nbsp;MIT-BLR</span>.
        </p>

        {/* Buttons */}
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

        {/* Social Media Icons */}
        <div className="flex space-x-6 justify-center mb-6">
          <a
            href="https://www.linkedin.com/in/ameya-mhatre-553003307/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-futures-3 hover:text-futures-1 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://github.com/AmeyaMprojects"
            target="_blank"
            rel="noopener noreferrer"
            className="text-futures-3 hover:text-futures-1 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={28} />
          </a>
          
          <a
            href="mailto:ameyam.projects@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-futures-3 hover:text-futures-1 transition-colors"
            aria-label="Email Address"
          >
            <Mail size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
