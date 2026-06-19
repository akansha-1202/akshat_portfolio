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
      >
        <div className="work-modal" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="work-modal-header">
            <div>
              <p className="work-modal-brand">{company.title}</p>
              <h3 className="work-modal-heading">{activeCategory?.label}</h3>
            </div>
            <button type="button" onClick={onClose} className="work-modal-close">
              ✕
            </button>
          </div>

          {/* Category tabs */}
          <div className="work-modal-tabs">
            {company.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`work-modal-tab ${
                  activeCategoryId === cat.id ? "work-modal-tab-active" : ""
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="work-modal-body">
            {activeCategory?.items?.length > 0 ? (
              <div className="work-modal-grid">
                {activeCategory.items.map((item) => {
                  const thumb = getDriveThumbnailUrl(item.driveFileId, 600);
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
                          />
                        ) : (
                          <span className="text-3xl">{activeCategory.icon}</span>
                        )}
                        {item.type === "video" && (
                          <span className="work-modal-play">▶</span>
                        )}
                      </div>
                      <p className="work-modal-item-title">{item.title}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="work-modal-empty">
                <span className="text-4xl">{activeCategory?.icon}</span>
                <p>No work added yet</p>
                {activeCategory?.driveFolderId && (
                  <a
                    href={getDriveFolderUrl(activeCategory.driveFolderId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-4 text-sm"
                  >
                    Open Drive Folder
                  </a>
                )}
              </div>
            )}
          </div>

          {activeCategory?.driveFolderId && activeCategory?.items?.length > 0 && (
            <div className="work-modal-footer">
              <a
                href={getDriveFolderUrl(activeCategory.driveFolderId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                View all in Google Drive ↗
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
