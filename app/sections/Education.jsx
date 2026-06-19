"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { education } from "@/app/constants";
import GlowCard from "@/app/components/GlowCard";

const ongoingCount = education.filter((item) =>
  item.period.includes("Present")
).length;

export default function Education() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".edu-animate"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".edu-card"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".edu-grid"),
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="edu-section section-padding">
      <div ref={sectionRef} className="section-container">
        <div className="edu-animate edu-header">
          <div className="edu-header-top">
            <div>
              <span className="section-label">Education</span>
              <h2 className="edu-title">
                Learning Path &{" "}
                <span className="gradient-text">Milestones</span>
              </h2>
            </div>
            <div className="edu-stats-pill">
              <span>
                <strong>{education.length}</strong> milestones
              </span>
              <span className="edu-stats-dot" />
              <span>
                <strong>{ongoingCount}</strong> ongoing
              </span>
            </div>
          </div>
          <p className="edu-subtitle">
            Certifications and ongoing growth in digital marketing, design, and
            creative technology.
          </p>
        </div>

        <div className="edu-grid">
          {education.map((item, i) => (
            <GlowCard key={item.title} className="edu-card">
              <div className="edu-card-inner">
                <div className="edu-card-head">
                  <div className="edu-card-icon-wrap">
                    <span className="edu-card-icon">{item.icon}</span>
                  </div>

                  <div className="edu-card-meta">
                    <div className="edu-card-badges">
                      <span className="edu-card-index">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="edu-card-type">{item.type}</span>
                      <span
                        className={`edu-card-period ${
                          item.period.includes("Present")
                            ? "edu-card-period-active"
                            : ""
                        }`}
                      >
                        {item.period}
                        {item.period.includes("Present") && (
                          <span className="edu-card-live" aria-hidden="true" />
                        )}
                      </span>
                    </div>

                    <h3 className="edu-card-title">{item.title}</h3>
                    <p className="edu-card-institution">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 1L1 4v4c0 2.5 2.2 4.5 5 5 2.8-.5 5-2.5 5-5V4L6 1z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item.institution}
                    </p>
                  </div>
                </div>

                <p className="edu-card-desc">{item.description}</p>
                <div className="edu-card-accent" aria-hidden="true" />
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
