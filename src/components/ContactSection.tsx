"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast"; // Assuming you have these toast utilities

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend service
    // For now, we'll just show a success toast.
    showSuccess("Thank you for your message! I'll get back to you soon.");
    // You might want to clear the form here
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-futures-1 mb-12">
          Get in Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card shadow-lg border-futures-5/30 transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-futures-2">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground">
              <div className="flex items-center space-x-3">
                <Mail className="text-futures-4" size={20} />
                <a href="mailto:youremail@example.com" className="hover:underline">youremail@example.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-futures-4" size={20} />
                <span>+1 (123) 456-7890</span> {/* Replace with your phone number */}
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-futures-4" size={20} />
                <span>Your City, Your Country</span> {/* Replace with your location */}
              </div>
              <p className="mt-4 text-sm text-foreground/70">
                Feel free to reach out for collaborations, project inquiries, or just to say hello!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-lg border-futures-5/30 transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-futures-2">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" required className="mt-1 bg-input border-futures-5/50 focus:border-futures-4" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required className="mt-1 bg-input border-futures-5/50 focus:border-futures-4" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} required className="mt-1 bg-input border-futures-5/50 focus:border-futures-4" />
                </div>
                <Button type="submit" className="w-full bg-futures-1 hover:bg-futures-2 text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;