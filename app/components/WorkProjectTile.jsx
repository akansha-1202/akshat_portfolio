"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { getThumbnailUrl } from "@/app/lib/cloudinary";
import { CachedImage } from "@/app/components/CachedMedia";

function getPreview(company) {
  for (const cat of company.categories) {
    const item = cat.items?.find((i) => i.publicId);
    if (item) return getThumbnailUrl(item, 700);
  }
  return null;
}

function countItems(company) {
  return company.categories.reduce((n, c) => n + (c.items?.length || 0), 0);
}

export default function WorkProjectTile({ company, index, onOpenCategory }) {
  const panelRef = useRef(null);
  const num = String(index + 1).padStart(2, "0");
  const preview = getPreview(company);
  const total = countItems(company);
  const defaultCategoryId = company.categories[0]?.id;

  useGSAP(
    () => {
      if (!panelRef.current) return;
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );
    },
    { scope: panelRef, dependencies: [index] }
  );

  return (
    <article ref={panelRef} className="work-panel">
      <button
        type="button"
        className="work-panel-hit"
        onClick={() => onOpenCategory(company, defaultCategoryId)}
        aria-label={`Open ${company.title} gallery`}
      >
        <div className="work-panel-media">
          {preview ? (
            <CachedImage
              src={preview}
              alt={company.title}
              loading="eager"
              wrapperClassName="work-panel-thumb"
            />
          ) : (
            <div className={`work-panel-fallback bg-gradient-to-br ${company.gradient}`} />
          )}

          <div className="work-panel-scrim" aria-hidden="true" />

          <div className="work-panel-info">
            <div className="work-panel-top">
              <span className="work-panel-index">{num}</span>
              <span className="work-panel-count">{total} pieces</span>
            </div>
            <h3 className="work-panel-title">{company.title}</h3>
            <p className="work-panel-sub">{company.subtitle}</p>
          </div>
        </div>
      </button>

      {company.categories.length > 1 && (
        <div className="work-panel-cats">
          {company.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="work-panel-cat"
              onClick={() => onOpenCategory(company, cat.id)}
            >
              {cat.label}
              <span>{cat.items?.length || 0}</span>
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
