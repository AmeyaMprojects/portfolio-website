"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/apple/Reveal";
import { Section } from "@/components/apple/Section";
import { SurfaceCard } from "@/components/apple/SurfaceCard";
import { spring } from "@/lib/motion";
import { showError } from "@/utils/toast";

const details = [
  { icon: Mail, label: "ameyam.projects@gmail.com", href: "mailto:ameyam.projects@gmail.com" },
  { icon: Phone, label: "+91 70452 29889", href: "tel:+917045229889" },
  { icon: MapPin, label: "Mumbai, India" },
];

type FieldName = "name" | "email" | "message";

const validators: Record<FieldName, (value: string) => string | null> = {
  name: (v) => (v.trim().length < 2 ? "Please enter your name." : null),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "That doesn't look like an email address."),
  message: (v) => (v.trim().length < 10 ? "A little more detail helps — 10 characters minimum." : null),
};

/**
 * Contact.
 *
 * Validation runs on blur, per field, so a mistake is caught where it was
 * made rather than reported as a list after submit. Success replaces the
 * form rather than firing a toast that vanishes — the completion state is
 * the answer to "did that work", so it stays on screen.
 */
const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const form = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();

  const validateField = (name: FieldName, value: string) => {
    const error = validators[name](value);
    setErrors((prev) => ({ ...prev, [name]: error ?? undefined }));
    return error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const data = new FormData(form.current);
    const nextErrors: Partial<Record<FieldName, string>> = {};
    (Object.keys(validators) as FieldName[]).forEach((field) => {
      const error = validators[field](String(data.get(field) ?? ""));
      if (error) nextErrors[field] = error;
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsLoading(true);
    try {
      await emailjs.sendForm(
        "service_1y2denx",
        "template_d936gxc",
        form.current,
        "K_husrdizwkfQ_Dc5",
      );
      // Haptic fires on the commit itself, on the same frame as the visual
      // state change. Reserved for this one moment — feedback everywhere
      // trains people to ignore all of it.
      navigator.vibrate?.(12);
      setSent(true);
      form.current.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      showError("Couldn't send that. Try again, or email me directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p id={`${name}-error`} className="type-caption mt-1.5 text-destructive">
        {errors[name]}
      </p>
    ) : null;

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      description="Open to collaborations, project work, or just a conversation."
      tone="raised"
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Reveal>
          <SurfaceCard className="h-full p-6 sm:p-7">
            <h3 className="type-headline text-foreground">Details</h3>
            <ul className="mt-5 space-y-4">
              {details.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={17} className="shrink-0 text-blue" aria-hidden />
                  {href ? (
                    <a
                      href={href}
                      className="text-[0.9375rem] tracking-[-0.004em] text-foreground transition-colors duration-200 hover:text-blue"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-[0.9375rem] tracking-[-0.004em] text-foreground">
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* Sets an expectation rather than leaving the reader guessing
                whether the form goes anywhere. */}
            <p className="type-body mt-6 border-t border-border pt-6 text-muted-foreground">
              I read everything that comes through here and usually reply within a
              couple of days. For anything time-sensitive, email is fastest.
            </p>
          </SurfaceCard>
        </Reveal>

        <Reveal delay={0.06}>
          <SurfaceCard className="h-full p-6 sm:p-7">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  className="flex h-full min-h-[19rem] flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                  transition={reduceMotion ? { duration: 0.2 } : spring.move}
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 className="type-headline text-foreground">Message sent</h3>
                  <p className="type-body mt-2 max-w-xs text-muted-foreground">
                    Thanks for reaching out — I&rsquo;ll get back to you soon.
                  </p>
                  {/* Agency: the completion state isn't a dead end. */}
                  <Button
                    variant="ghost"
                    className="mt-6"
                    onClick={() => setSent(false)}
                  >
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="type-headline text-foreground">Send a message</h3>
                  <form ref={form} onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                    <div>
                      <Label htmlFor="name" className="type-caption text-muted-foreground">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        className="mt-1.5"
                        disabled={isLoading}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        onBlur={(e) => validateField("name", e.target.value)}
                      />
                      {fieldError("name")}
                    </div>

                    <div>
                      <Label htmlFor="email" className="type-caption text-muted-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="mt-1.5"
                        disabled={isLoading}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        onBlur={(e) => validateField("email", e.target.value)}
                      />
                      {fieldError("email")}
                    </div>

                    <div>
                      <Label htmlFor="message" className="type-caption text-muted-foreground">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="What would you like to build?"
                        className="mt-1.5"
                        disabled={isLoading}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        onBlur={(e) => validateField("message", e.target.value)}
                      />
                      {fieldError("message")}
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </SurfaceCard>
        </Reveal>
      </div>
    </Section>
  );
};

export default ContactSection;
