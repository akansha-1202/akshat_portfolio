"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { toolkit } from "@/app/constants";
import GlowCard from "@/app/components/GlowCard";

const totalTools = toolkit.reduce((n, group) => n + group.tools.length, 0);

export default function Toolkit() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".toolkit-animate"),
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
        sectionRef.current.querySelectorAll(".toolkit-card"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".toolkit-grid"),
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="skills" className="toolkit-section section-padding">
      <div ref={sectionRef} className="section-container">
        {/* Header */}
        <div className="toolkit-animate toolkit-header">
          <div className="toolkit-header-top">
            <div>
              <span className="section-label">Toolkit</span>
              <h2 className="toolkit-title">
                Tools & Software{" "}
                <span className="gradient-text">I Use</span>
              </h2>
            </div>
            <div className="toolkit-stats-pill">
              <span>
                <strong>{toolkit.length}</strong> categories
              </span>
              <span className="toolkit-stats-dot" />
              <span>
                <strong>{totalTools}</strong> tools
              </span>
            </div>
          </div>
          <p className="toolkit-subtitle">
            From quick social creatives to polished video edits — the stack
            behind every project.
          </p>
        </div>

        {/* Cards */}
        <div className="toolkit-grid">
          {toolkit.map((group, i) => (
            <GlowCard key={group.category} className="toolkit-card">
              <div className="toolkit-card-inner">
                <div className="toolkit-card-top">
                  <span className="toolkit-card-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="toolkit-card-count">
                    {group.tools.length} tools
                  </span>
                </div>

                <div className="toolkit-card-head">
                  <div className="toolkit-card-icon-wrap">
                    <span className="toolkit-card-icon">{group.icon}</span>
                  </div>
                  <div>
                    <h3 className="toolkit-card-title">{group.category}</h3>
                    <p className="toolkit-card-desc">{group.description}</p>
                  </div>
                </div>

                <div className="toolkit-chips">
                  {group.tools.map((tool) => (
                    <span key={tool} className="toolkit-chip">
                      <span className="toolkit-chip-dot" aria-hidden="true" />
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="toolkit-card-accent" aria-hidden="true" />
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
