"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { education } from "@/app/constants";
import TitleHeader from "@/app/components/TitleHeader";
import GlowCard from "@/app/components/GlowCard";

export default function Education() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".edu-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="section-padding">
      <div ref={sectionRef} className="section-container">
        <TitleHeader
          label="Education"
          title="Learning Path & Milestones"
          subtitle="Foundational certifications and ongoing growth in digital marketing and design."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <GlowCard key={item.title} className="edu-card p-6">
              <span className="text-xs font-medium uppercase tracking-wider text-accent">
                {item.period}
              </span>
              <h3
                className="mt-2 text-lg font-bold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
