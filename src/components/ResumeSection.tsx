"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string[];
}

const timelineData: TimelineItemProps[] = [
  {
    title: "Chair - IEEE Computational Intelligence Society (CIS)",
    subtitle: "MAHE Bengaluru Chapter",
    date: "August 2025 - June 2026",
    description: [
      "Leading the IEEE CIS student chapter in strategic planning and execution of technical workshops, guest lectures, and innovative projects focused on computational intelligence, machine learning, and AI technologies.",
      "Managing and mentoring a diverse committee of students passionate about emerging technologies, fostering collaborative learning environments and professional development opportunities.",
      "Developing partnerships with industry leaders and academic institutions to provide hands-on experience through hackathons, research collaborations, and internship opportunities.",
      "Building a vibrant community of 50+ students through regular technical sessions, paper presentations, and collaborative projects that bridge theoretical knowledge with practical implementation.",
    ],
  },
  {
    title: "Cybersecurity Intern",
    subtitle: "Mastek Ltd.",
    date: "June - August 2025",
    description: [
      "Created and managed a comprehensive audit sheet for multiple cybersecurity frameworks, including NIST Cybersecurity Framework (CSF), NIST Artificial Intelligence (AI) Risk Management Framework (RMF), and ISO 27001/27002 standards.",
      "Conducted detailed mapping of audit questions across NIST and ISO frameworks to ensure alignment with industry best practices and organizational compliance.",
      "Developed and actively enhancing an automated auditing solution as part of Governance, Risk, and Compliance (GRC) work, streamlining audit processes across NIST CSF, NIST AI RMF, and ISO frameworks.",
    ],
  },
  {
    title: "B.Tech.. in Computer Science",
    subtitle: "Manipal institute of Technology",
    date: "Sept 2024 - May 2028",
    description: [
      "I'm currently pursuing my degree in B.Tech in Computer Science with a strong interest in software development, data structures, and real-world problem-solving through technology. I enjoy building projects that make life easier, whether it's through web apps, automation, or exploring AI.",
      "Worked on Cybersecurity for Autonous Buggy leading to expiernece in ROS and C++.",
    ],
  },
];

const ResumeSection = () => {
  return (
    <section id="resume" className="py-16 px-4 bg-futures-5/10 relative overflow-hidden">
      {/* Optimized Galaxy Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
        
        {/* Reduced Animated Stars - only 20 instead of 50 */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse will-change-auto"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`, // Slower animation
              }}
            ></div>
          ))}
        </div>
        
        {/* Reduced Larger Stars - only 8 instead of 20 */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-300/60 rounded-full animate-ping will-change-auto"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`, // Longer delays
                animationDuration: `${4 + Math.random() * 4}s`, // Slower animation
              }}
            ></div>
          ))}
        </div>
        
        {/* Static Nebula Effect - removed animation */}
        <div 
          className="absolute inset-0 opacity-60" 
          style={{ 
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 50%, rgba(37, 99, 235, 0.1) 100%)',
          }}
        ></div>
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-futures-1 mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut"
            }
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          My Journey
        </motion.h2>

        <div className="relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:h-full before:w-0.5 before:bg-futures-4/50 before:rounded-full">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="mb-8 flex flex-col md:flex-row items-start md:items-center w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.4, // Reduced from 0.6
                  delay: index * 0.1, // Reduced from 0.2
                  ease: "easeOut"
                }
              }}
              viewport={{ 
                once: true, 
                margin: "-50px" // Reduced margin
              }}
            >
              <motion.div 
                className="md:w-1/2 md:pr-8 relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} // Reduced movement
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.3, // Reduced from 0.5
                    delay: index * 0.1 + 0.05, // Reduced delays
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="absolute left-2 md:left-auto md:right-[-1.25rem] top-2 w-4 h-4 bg-futures-1 rounded-full z-10 border-2 border-background"
                  initial={{ scale: 0 }} // Removed rotation for performance
                  whileInView={{ 
                    scale: 1,
                    transition: {
                      duration: 0.3, // Reduced from 0.4
                      delay: index * 0.1 + 0.15,
                      ease: "easeOut" // Changed from backOut
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1, // Reduced from 1.2
                    transition: { duration: 0.1 } // Added fast transition
                  }}
                ></motion.div>
                <motion.div
                  whileHover={{ 
                    y: -2, // Reduced from -5
                    transition: { duration: 0.1 } // Faster transition
                  }}
                >
                  <Card className="bg-card shadow-lg border-futures-5/30 transition-all duration-200 hover:shadow-xl w-full"> {/* Reduced duration */}
                    <CardHeader>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ 
                          opacity: 1,
                          transition: {
                            duration: 0.3, // Reduced from 0.4
                            delay: index * 0.1 + 0.2
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        <CardTitle className="text-xl text-futures-2">{item.title}</CardTitle>
                        <p className="text-sm text-foreground/70">{item.subtitle}</p>
                        <p className="text-xs text-futures-3">{item.date}</p>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <motion.ul 
                        className="list-disc list-inside space-y-1 text-foreground leading-relaxed text-left"
                        initial={{ opacity: 0 }}
                        whileInView={{ 
                          opacity: 1,
                          transition: {
                            duration: 0.3, // Reduced from 0.5
                            delay: index * 0.1 + 0.3
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        {item.description.map((desc, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }} // Reduced movement
                            whileInView={{ 
                              opacity: 1, 
                              x: 0,
                              transition: {
                                duration: 0.2, // Reduced from 0.3
                                delay: index * 0.1 + 0.4 + (i * 0.05) // Reduced delays
                              }
                            }}
                            viewport={{ once: true }}
                          >
                            {desc}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              <div className="md:w-1/2 md:pl-8">
                {/* This div is intentionally left empty for layout balance on larger screens */}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"
            }
          }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild className="bg-futures-1 hover:bg-futures-2 text-white px-6 py-3 text-lg rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
              <a href="/your-resume.pdf" download="Your_Name_Resume.pdf"> {/* Replace with your actual resume PDF path */}
                <Download className="mr-2 h-5 w-5" /> Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;