"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { services } from "@/app/constants";
import GlowCard from "@/app/components/GlowCard";

export default function Services() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".services-animate"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".service-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".services-grid"),
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="services-section section-padding">
      <div ref={sectionRef} className="section-container">
        {/* Header */}
        <div className="services-animate services-header">
          <div className="services-header-top">
            <div>
              <span className="section-label">What I Do</span>
              <h2 className="services-title">
                Services Built for{" "}
                <span className="gradient-text">Results</span>
              </h2>
            </div>
            <div className="services-stats-pill">
              <span>
                <strong>{services.length}</strong> core services
              </span>
              <span className="services-stats-dot" />
              <span>Design · Video · Ads</span>
            </div>
          </div>
          <p className="services-subtitle">
            From scroll-stopping ads to polished video edits — creative work
            aligned with marketing goals and brand growth.
          </p>
        </div>

        {/* Cards */}
        <div className="services-grid">
          {services.map((service, i) => (
            <GlowCard key={service.title} className="service-card">
              <div className="service-card-inner">
                <div className="service-card-top">
                  <span className="service-card-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="service-card-icon-wrap">
                    <span className="service-card-icon">{service.icon}</span>
                  </div>
                </div>

                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>

                {service.highlights?.length > 0 && (
                  <ul className="service-card-highlights">
                    {service.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                <div className="service-card-accent" aria-hidden="true" />
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
