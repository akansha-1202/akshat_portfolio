"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { experience } from "@/app/constants";
import GlowCard from "@/app/components/GlowCard";

function getInitials(name) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const currentRoles = experience.filter((job) =>
    job.period.includes("Present")
  ).length;

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".exp-animate"),
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
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".exp-timeline"),
            start: "top 72%",
            end: "bottom 55%",
            scrub: 1,
          },
        }
      );

      sectionRef.current.querySelectorAll(".exp-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -36 : 36, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="experience" className="exp-section section-padding">
      <div ref={sectionRef} className="section-container">
        {/* Header */}
        <div className="exp-animate exp-header">
          <div className="exp-header-top">
            <div>
              <span className="section-label">Career Overview</span>
              <h2 className="exp-title">
                Professional{" "}
                <span className="gradient-text">Experience</span>
              </h2>
            </div>
            <div className="exp-stats-pill">
              <span>
                <strong>{experience.length}</strong> roles
              </span>
              <span className="exp-stats-dot" />
              <span>
                <strong>{currentRoles}</strong> active
              </span>
            </div>
          </div>
          <p className="exp-subtitle">
            Hands-on creative work across education, media, and real estate
            brands — from Meta ads to YouTube edits.
          </p>
        </div>

        {/* Timeline */}
        <div className="exp-timeline relative">
          <div className="exp-timeline-line-wrap" aria-hidden="true">
            <div ref={lineRef} className="exp-timeline-line" />
          </div>

          <div className="exp-timeline-list">
            {experience.map((job, i) => {
              const isCurrent = job.period.includes("Present");
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={job.company}
                  className={`exp-card exp-card-${isLeft ? "left" : "right"}`}
                >
                  <div className="exp-timeline-node" aria-hidden="true">
                    <span className="exp-timeline-dot" />
                  </div>

                  <GlowCard className="exp-card-frame">
                    <div className="exp-card-inner">
                      <div className="exp-card-head">
                        <div className="exp-card-avatar">{getInitials(job.company)}</div>
                        <div className="exp-card-meta">
                          <div className="exp-card-meta-top">
                            <span className="exp-card-index">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {isCurrent && (
                              <span className="exp-card-badge">Current</span>
                            )}
                          </div>
                          <h3 className="exp-card-role">{job.role}</h3>
                          <p className="exp-card-company">{job.company}</p>
                        </div>
                        <span
                          className={`exp-card-period ${
                            isCurrent ? "exp-card-period-current" : ""
                          }`}
                        >
                          {job.period}
                        </span>
                      </div>

                      <ul className="exp-card-list">
                        {job.responsibilities.map((item) => (
                          <li key={item}>
                            <span className="exp-card-bullet" aria-hidden="true">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M2 5l2.5 2.5L8 3"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="exp-card-accent" aria-hidden="true" />
                    </div>
                  </GlowCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
