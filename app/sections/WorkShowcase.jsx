"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { companies, driveFolderUrl } from "@/app/constants";
import WorkProjectTile from "@/app/components/WorkProjectTile";
import WorkGalleryModal from "@/app/components/WorkGalleryModal";

export default function WorkShowcase() {
  const sectionRef = useRef(null);
  const [gallery, setGallery] = useState(null);

  const totalProjects = companies.reduce(
    (n, c) =>
      n + c.categories.reduce((s, cat) => s + (cat.items?.length || 0), 0),
    0
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".work-animate"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
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
    <section id="work" className="work-section section-padding" ref={sectionRef}>
      <div className="section-container">
        {/* Header */}
        <div className="work-animate work-header">
          <div className="work-header-top">
            <div>
              <span className="section-label">Portfolio</span>
              <h2 className="work-title">
                Client <span className="gradient-text">Showcase</span>
              </h2>
            </div>
            <div className="work-stats-pill">
              <span>
                <strong>{companies.length}</strong> brands
              </span>
              <span className="work-stats-dot" />
              <span>
                <strong>{totalProjects}</strong> pieces
              </span>
            </div>
          </div>
          <p className="work-subtitle">
            Graphic design posts & video reels — pick a category to open the
            gallery.
          </p>
          <a
            href={driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="work-drive-btn"
          >
            Browse full portfolio on Drive ↗
          </a>
        </div>

        {/* 2 × 2 grid */}
        <div className="work-animate work-grid">
          {companies.map((company, i) => (
            <WorkProjectTile
              key={company.id}
              company={company}
              index={i}
              onOpenCategory={(c, id) => setGallery({ company: c, categoryId: id })}
            />
          ))}
        </div>
      </div>

      {gallery && (
        <WorkGalleryModal
          company={gallery.company}
          initialCategoryId={gallery.categoryId}
          onClose={() => setGallery(null)}
        />
      )}
    </section>
  );
}
