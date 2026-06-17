"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { experience } from "@/app/constants";
import TitleHeader from "@/app/components/TitleHeader";
import GlowCard from "@/app/components/GlowCard";

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".exp-card"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
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
    <section id="experience" className="section-padding">
      <div ref={sectionRef} className="section-container">
        <TitleHeader
          label="Career Overview"
          title="Professional Work Experience"
          subtitle="Hands-on creative work across education, media, and real estate brands."
        />

        <div className="relative">
          <div ref={lineRef} className="timeline-line hidden md:block" />

          <div className="flex flex-col gap-8">
            {experience.map((job, i) => (
              <div
                key={job.company}
                className={`exp-card relative md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <div className="absolute -left-1 top-8 hidden h-3 w-3 rounded-full bg-accent md:left-1/2 md:-translate-x-1/2 md:block" />
                <GlowCard className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {job.role}
                      </h3>
                      <p className="mt-1 text-accent">{job.company}</p>
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {job.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
