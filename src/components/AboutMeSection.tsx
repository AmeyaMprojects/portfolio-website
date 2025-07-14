"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutMeSection = () => {
  return (
    <section id="about" className="py-16 px-4 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Animation Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-futures-1/5 via-futures-4/5 to-futures-2/5 animate-pulse" style={{ animationDuration: '6s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-futures-3/30 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Floating Bubbles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-futures-1/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Moving Geometric Shapes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 border border-futures-4/20 rotate-45 animate-spin"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-futures-2/10 rounded-full blur-sm animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10 container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-futures-1 mb-12">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card shadow-lg border-futures-5/30 transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-futures-2">Overview</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground leading-relaxed">
              <p className="mb-4">
                I'm a software engineer with a passion for crafting robust and scalable fullstack web applications.   I thrive in environments where I can continuously learn and apply new technologies to build impactful products and solutions.
              </p>
              <p>
                My expertise spans across various programming languages and frameworks, allowing me to tackle challenges from diverse angles. I am particularly excited about the intersection of web development and cybersecurity, always striving to build secure and resilient systems.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-lg border-futures-5/30 transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-futures-2">Fun Facts</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
                <li>When I'm not coding, you can find me on the hardwood court perfecting my jumpshot or experimenting with new recipes in the kitchen</li>
                <li>I'm an avid reader of fiction novels and enjoy dissecting complex plots</li>
                <li>I love contributing to open-source projects and learning from the community</li>
                <li>My favorite way to unwind is by playing online games with friends</li>
                <li>You can catch me binge-watching on the weekends</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;