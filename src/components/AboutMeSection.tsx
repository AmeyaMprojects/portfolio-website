"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutMeSection = () => {
  return (
    <section id="about" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
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
                I'm a dedicated software engineer with a passion for crafting robust and scalable web applications. My journey in tech began with a fascination for how digital solutions can solve real-world problems, leading me to dive deep into both frontend and backend development. I thrive in environments where I can continuously learn and apply new technologies to build impactful products.
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
                <li>When I'm not coding, you can find me exploring new hiking trails or experimenting with new recipes in the kitchen.</li>
                <li>I'm an avid reader of sci-fi novels and enjoy dissecting complex plots.</li>
                <li>I love contributing to open-source projects and learning from the community.</li>
                <li>My favorite way to unwind is by playing strategic board games with friends.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;