"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { getDriveThumbnailUrl } from "@/app/lib/drive";

function getCategoryThumb(category) {
  const item = category.items?.find((i) => i.driveFileId);
  if (!item) return null;
  return getDriveThumbnailUrl(item.driveFileId, 500);
}

export default function WorkProjectTile({ company, index, onOpenCategory }) {
  const tileRef = useRef(null);
  const num = String(index + 1).padStart(2, "0");

  const thumbs = company.categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    icon: cat.icon,
    kind: cat.kind,
    thumb: getCategoryThumb(cat),
    count: cat.items?.length || 0,
  }));

  useGSAP(
    () => {
      if (!tileRef.current) return;
      gsap.fromTo(
        tileRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tileRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: tileRef, dependencies: [index] }
  );

  return (
    <article ref={tileRef} className="work-card">
      <div className="work-card-frame">
        {/* Preview area */}
        <div className="work-card-media">
          {thumbs.every((t) => t.thumb) ? (
            <div className="work-card-split">
              {thumbs.map((t) => (
                <div key={t.id} className="work-card-split-pane">
                  <img src={t.thumb} alt="" referrerPolicy="no-referrer" />
                  <span className="work-card-split-label">{t.icon}</span>
                </div>
              ))}
            </div>
          ) : thumbs.find((t) => t.thumb) ? (
            <img
              src={thumbs.find((t) => t.thumb).thumb}
              alt={company.title}
              referrerPolicy="no-referrer"
              className="work-card-single-img"
            />
          ) : (
            <div className={`work-card-fallback bg-gradient-to-br ${company.gradient}`} />
          )}
          <div className="work-card-media-overlay" />
        </div>

        {/* Info */}
        <div className="work-card-body">
          <div className="work-card-meta">
            <span className="work-card-index">{num}</span>
            {company.featured && (
              <span className="work-card-featured">Featured</span>
            )}
          </div>

          <h3 className="work-card-name">{company.title}</h3>
          <p className="work-card-desc">{company.subtitle}</p>

          <div className="work-card-tags">
            {thumbs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onOpenCategory(company, t.id)}
                className="work-card-tag-btn"
              >
                <span className="work-card-tag-icon">{t.icon}</span>
                <span className="work-card-tag-text">{t.label}</span>
                {t.count > 0 && (
                  <span className="work-card-tag-count">{t.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
