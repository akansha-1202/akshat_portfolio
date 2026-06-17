"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { services } from "@/app/constants";
import TitleHeader from "@/app/components/TitleHeader";
import GlowCard from "@/app/components/GlowCard";

export default function Services() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".service-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="section-padding bg-surface/50">
      <div ref={sectionRef} className="section-container">
        <TitleHeader
          label="What I Do"
          title="Services Built for Results"
          subtitle="From scroll-stopping ads to polished video edits — creative work aligned with marketing goals."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <GlowCard key={service.title} className="service-card p-8">
              <span className="text-4xl">{service.icon}</span>
              <h3
                className="mt-4 text-xl font-bold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
