"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "@/app/constants";
import TitleHeader from "@/app/components/TitleHeader";
import GlowCard from "@/app/components/GlowCard";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_email: profile.email,
          },
          publicKey
        );
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        return;
      } catch {
        setStatus("error");
        return;
      }
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <section id="contact" className="section-padding bg-surface/50">
      <div className="section-container">
        <TitleHeader
          label="Get in Touch"
          title="Let's Connect"
          subtitle="Have a project, collaboration, or just a hello — drop a message and I'll get back to you soon."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <GlowCard className="p-8 lg:col-span-2">
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Contact Info
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <span className="text-muted">Email</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1 block text-foreground transition-colors hover:text-accent"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <span className="text-muted">Phone</span>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="mt-1 block text-foreground transition-colors hover:text-accent"
                >
                  {profile.phone}
                </a>
              </li>
              <li>
                <span className="text-muted">Location</span>
                <p className="mt-1">{profile.location}</p>
              </li>
              <li>
                <span className="text-muted">Languages</span>
                <p className="mt-1">{profile.languages.join(" · ")}</p>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              {profile.socials.instagram !== "#" && (
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Instagram
                </a>
              )}
              {profile.socials.behance !== "#" && (
                <a
                  href={profile.socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Behance
                </a>
              )}
            </div>
          </GlowCard>

          <form
            onSubmit={handleSubmit}
            className="card-surface flex flex-col gap-4 p-8 lg:col-span-3"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-muted">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="form-input"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-muted">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="form-input"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-muted">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="form-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary mt-2 w-fit disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-accent">Message sent! I&apos;ll reply soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please email {profile.email} directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
