"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { toolkit } from "@/app/constants";
import TitleHeader from "@/app/components/TitleHeader";

export default function Toolkit() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".tool-group"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="skills" className="section-padding bg-surface/50">
      <div ref={sectionRef} className="section-container">
        <TitleHeader
          label="Toolkit"
          title="Tools & Software I Use"
          subtitle="From quick social creatives to polished video edits — the stack behind the work."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {toolkit.map((group) => (
            <div key={group.category} className="tool-group card-surface p-6">
              <h3
                className="mb-4 text-lg font-bold text-accent"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <span key={tool} className="tool-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
