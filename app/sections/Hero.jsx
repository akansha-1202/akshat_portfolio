"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { profile, stats, companies } from "@/app/constants";
import AnimatedCounter from "@/app/components/AnimatedCounter";

const posterLayout = [
  { project: companies[0], className: "left-[5%] top-[8%] w-[45%] rotate-[-6deg] z-20", delay: 0 },
  { project: companies[1], className: "right-[8%] top-[5%] w-[40%] rotate-[4deg] z-10", delay: 0.15 },
  { project: companies[2], className: "left-[15%] bottom-[10%] w-[38%] rotate-[3deg] z-30", delay: 0.3 },
  { project: companies[3], className: "right-[12%] bottom-[8%] w-[42%] rotate-[-3deg] z-15", delay: 0.45 },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const collageRef = useRef(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      if (collageRef.current) {
        gsap.fromTo(
          collageRef.current.children,
          { opacity: 0, scale: 0.85, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.2)",
            delay: 0.5,
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-padding relative min-h-screen overflow-hidden pt-28"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,74,0.12),transparent_50%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,166,35,0.08),transparent_50%)] md:hidden" />

      <div className="section-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div ref={contentRef}>
          <p className="section-label">Creative Portfolio</p>
          <h1
            className="display-heading mt-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-accent md:text-xl">{profile.title}</p>
          <p className="mt-2 text-sm text-muted">{profile.location}</p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#work" className="btn-primary">
              View My Work →
            </a>
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <span className="text-border">·</span>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div
          ref={collageRef}
          className="relative mx-auto hidden aspect-square w-full max-w-lg md:block"
        >
          {posterLayout.map(({ project, className, delay }) => (
            <div
              key={project.id}
              className={`hero-poster ${className} aspect-[3/4] animate-float`}
              style={{ animationDelay: `${delay}s` }}
            >
              <Image
                src={project.poster}
                alt={project.title}
                fill
                className="object-cover"
                sizes="300px"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <div className="section-container mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <AnimatedCounter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
