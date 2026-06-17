"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import Image from "next/image";

export default function FlipProjectCard({ project, index, onWatch, featured = false }) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useGSAP(
    () => {
      if (!cardRef.current || !innerRef.current) return;

      const isCoarse = window.matchMedia("(pointer: coarse)").matches;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: isCoarse ? 30 : 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      if (!isCoarse) {
        gsap.to(innerRef.current, {
          rotateY: 180,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 65%",
            end: "top 35%",
            scrub: 1,
          },
        });
      } else {
        gsap.to(innerRef.current, {
          rotateY: 180,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 60%",
            once: true,
          },
        });
      }
    },
    { scope: cardRef, dependencies: [index] }
  );

  const handleMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const heightClass = featured ? "min-h-[420px] md:min-h-[480px]" : "min-h-[320px]";

  return (
    <div
      ref={cardRef}
      className={`flip-card group ${heightClass} w-full`}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        className="flip-card-inner h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flip-card-face card-surface relative h-full">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
          <Image
            src={project.poster}
            alt={project.title}
            fill
            className="object-cover opacity-80"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {featured && (
              <span className="mb-2 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-background">
                Featured
              </span>
            )}
            <h3
              className="text-xl font-bold md:text-2xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/50 bg-background/40 px-2 py-0.5 text-xs backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flip-card-face flip-card-back card-surface flex h-full flex-col justify-between p-6"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div>
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onWatch(project)}
            className="btn-primary mt-6 w-full"
          >
            Watch Reel →
          </button>
        </div>
      </div>
    </div>
  );
}
