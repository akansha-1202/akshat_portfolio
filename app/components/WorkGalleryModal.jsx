"use client";

import { useEffect, useState } from "react";
import { getDriveFolderUrl, getDriveThumbnailUrl } from "@/app/lib/drive";
import MediaViewer from "@/app/components/MediaViewer";

export default function WorkGalleryModal({ company, initialCategoryId, onClose }) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    initialCategoryId || company.categories[0]?.id
  );
  const [activeItem, setActiveItem] = useState(null);

  const activeCategory = company.categories.find(
    (c) => c.id === activeCategoryId
  );
  const itemCount = activeCategory?.items?.length || 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && !activeItem && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, activeItem]);

  return (
    <>
      <div
        className="work-modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
      >
        <div className="work-modal" onClick={(e) => e.stopPropagation()}>
          <div className="work-modal-glow" aria-hidden="true" />

          {/* Header */}
          <div className="work-modal-header">
            <div className="work-modal-header-main">
              <div className="work-modal-header-meta">
                <span className="work-modal-brand">{company.title}</span>
                {company.featured && (
                  <span className="work-modal-featured">Featured</span>
                )}
              </div>
              <h3 id="work-modal-title" className="work-modal-heading">
                {activeCategory?.label}
              </h3>
              {activeCategory?.description && (
                <p className="work-modal-desc">{activeCategory.description}</p>
              )}
              {itemCount > 0 && (
                <p className="work-modal-count">
                  {itemCount} {itemCount === 1 ? "piece" : "pieces"}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="work-modal-close"
              aria-label="Close gallery"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Category tabs */}
          <div className="work-modal-tabs-wrap">
            <div className="work-modal-tabs" role="tablist">
              {company.categories.map((cat) => {
                const count = cat.items?.length || 0;
                const isActive = activeCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`work-modal-tab ${isActive ? "work-modal-tab-active" : ""}`}
                  >
                    <span className="work-modal-tab-icon">{cat.icon}</span>
                    <span className="work-modal-tab-label">{cat.label}</span>
                    {count > 0 && (
                      <span className="work-modal-tab-count">{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Items */}
          <div className="work-modal-body">
            {itemCount > 0 ? (
              <div className="work-modal-grid">
                {activeCategory.items.map((item) => {
                  const thumb = getDriveThumbnailUrl(item.driveFileId, 600);
                  const isVideo = item.type === "video";
                  return (
                    <button
                      key={item.id || item.title}
                      type="button"
                      onClick={() => setActiveItem(item)}
                      className="work-modal-item"
                    >
                      <div className="work-modal-item-img">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        ) : (
                          <span className="work-modal-item-fallback">
                            {activeCategory.icon}
                          </span>
                        )}
                        <div className="work-modal-item-overlay" aria-hidden="true">
                          <span className="work-modal-item-view">
                            {isVideo ? "Play reel" : "View"}
                          </span>
                        </div>
                        {isVideo && (
                          <span className="work-modal-play" aria-hidden="true">
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                              <path d="M0 0v12l10-6L0 0z" />
                            </svg>
                          </span>
                        )}
                        <span className="work-modal-item-type">
                          {isVideo ? "Reel" : item.type === "pdf" ? "PDF" : "Post"}
                        </span>
                      </div>
                      <p className="work-modal-item-title">{item.title}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="work-modal-empty">
                <div className="work-modal-empty-icon">{activeCategory?.icon}</div>
                <p className="work-modal-empty-title">Nothing here yet</p>
                <p className="work-modal-empty-desc">
                  Work for this category will appear here once added.
                </p>
                {activeCategory?.driveFolderId && (
                  <a
                    href={getDriveFolderUrl(activeCategory.driveFolderId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline work-modal-empty-btn"
                  >
                    Open Drive Folder ↗
                  </a>
                )}
              </div>
            )}
          </div>

          {activeCategory?.driveFolderId && itemCount > 0 && (
            <div className="work-modal-footer">
              <a
                href={getDriveFolderUrl(activeCategory.driveFolderId)}
                target="_blank"
                rel="noopener noreferrer"
                className="work-modal-drive-link"
              >
                View all in Google Drive
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 10L10 2M10 2H4M10 2v6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {activeItem && (
        <MediaViewer item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </>
  );
}
