"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import emailjs from "@emailjs/browser";
import { profile } from "@/app/constants";
import GlowCard from "@/app/components/GlowCard";

const contactItems = [
  {
    key: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M2 4h14v10H2V4zm0 0l7 5 7-5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "phone",
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4 2h3l1.5 4-2 1.2a10 10 0 004.3 4.3L12 9.5 16 11v3a2 2 0 01-2.2 2A13 13 0 012 4.2 2 2 0 014 2z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "location",
    label: "Location",
    value: profile.location,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 16s5-4.5 5-9a5 5 0 10-10 0c0 4.5 5 9 5 9z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="7" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "languages",
    label: "Languages",
    value: profile.languages.join(" · "),
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M2 9h14M9 2c2 2.5 2 11.5 0 14M9 2c-2 2.5-2 11.5 0 14"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".contact-animate"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".contact-panel"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".contact-grid"),
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

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
    <section id="contact" className="contact-section section-padding">
      <div ref={sectionRef} className="section-container">
        {/* Header */}
        <div className="contact-animate contact-header">
          <div className="contact-header-top">
            <div>
              <span className="section-label">Get in Touch</span>
              <h2 className="contact-title">
                Let&apos;s <span className="gradient-text">Connect</span>
              </h2>
            </div>
            <div className="contact-stats-pill">
              <span className="contact-live-dot" aria-hidden="true" />
              <span>Available for freelance & collaborations</span>
            </div>
          </div>
          <p className="contact-subtitle">
            Have a project, collaboration, or just a hello — drop a message and
            I&apos;ll get back to you soon.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info panel */}
          <GlowCard className="contact-panel contact-info">
            <div className="contact-info-inner">
              <div className="contact-info-glow" aria-hidden="true" />

              <div className="contact-info-intro">
                <span className="contact-info-label">Say hello</span>
                <h3 className="contact-info-name">{profile.name}</h3>
                <p className="contact-info-tagline">{profile.tagline}</p>
              </div>

              <ul className="contact-info-list">
                {contactItems.map((item) => (
                  <li key={item.key} className="contact-info-item">
                    <span className="contact-info-icon">{item.icon}</span>
                    <div>
                      <span className="contact-info-field">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="contact-info-value">
                          {item.value}
                        </a>
                      ) : (
                        <p className="contact-info-value">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="contact-info-actions">
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-whatsapp-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 1a7 7 0 00-6 10.3L1 15l3.8-1A7 7 0 108 1zm3.5 9.8c-.15.4-.9.8-1.2.8-.3 0-.7.1-3.3-1.4-2.8-1.5-4.6-5.2-4.7-5.5-.1-.3-.4-1.2.1-1.7.3-.3.7-.8 1-.8.25 0 .5 0 .7.05.2.05.5-.05.8.6.3.7.9 2.2 1 2.35.1.15.1.35 0 .5-.1.15-.15.25-.3.4-.15.15-.3.3-.15.55.15.25.65 1.1 1.4 1.75 1 .85 1.8 1.1 2.05 1.25.25.15.4.1.55-.05.15-.15.65-.75.85-1 .2-.25.4-.2.65-.1.25.1 1.6.75 1.85.9.25.15.45.2.5.35.05.15.05.85-.1 1.25z" />
                  </svg>
                  Chat on WhatsApp
                </a>

                <div className="contact-socials">
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    LinkedIn
                  </a>
                  {profile.socials.instagram !== "#" && (
                    <a
                      href={profile.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                    >
                      Instagram
                    </a>
                  )}
                  {profile.socials.behance !== "#" && (
                    <a
                      href={profile.socials.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                    >
                      Behance
                    </a>
                  )}
                </div>
              </div>

              <div className="contact-info-accent" aria-hidden="true" />
            </div>
          </GlowCard>

          {/* Form panel */}
          <div className="contact-panel contact-form-wrap">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-head">
                <h3 className="contact-form-title">Send a message</h3>
                <p className="contact-form-desc">
                  Fill in the details below — I typically reply within 24 hours.
                </p>
              </div>

              <div className="contact-form-fields">
                <div className="contact-field">
                  <label htmlFor="name" className="contact-label">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="John Doe"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="email" className="contact-label">
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="you@email.com"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="message" className="contact-label">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="contact-input contact-textarea"
                    placeholder="Tell me about your project, timeline, and goals..."
                  />
                </div>
              </div>

              <div className="contact-form-foot">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="contact-submit-btn"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {status !== "sending" && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {status === "sent" && (
                  <p className="contact-status contact-status-success">
                    Message sent! I&apos;ll reply soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="contact-status contact-status-error">
                    Something went wrong. Please email {profile.email} directly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
