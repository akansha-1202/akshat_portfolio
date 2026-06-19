"use client";

import { useEffect } from "react";
import { getDriveEmbedUrl, getDriveThumbnailUrl, getDriveViewUrl } from "@/app/lib/drive";

const TYPE_META = {
  video: { label: "Reel", icon: "▶" },
  image: { label: "Post", icon: "🖼" },
  pdf: { label: "PDF", icon: "📄" },
};

export default function MediaViewer({ item, onClose }) {
  const embedUrl = getDriveEmbedUrl(item.driveFileId);
  const thumbUrl = getDriveThumbnailUrl(item.driveFileId);
  const viewUrl = getDriveViewUrl(item.driveFileId);
  const isVideo = item.type === "video";
  const isImage = item.type === "image";
  const isPdf = item.type === "pdf";
  const typeMeta = TYPE_META[item.type] || { label: item.type, icon: "📁" };
  const hasMedia = (embedUrl && (isVideo || isPdf)) || (isImage && thumbUrl);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="media-viewer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-viewer-title"
    >
      <div className="media-viewer" onClick={(e) => e.stopPropagation()}>
        <div className="media-viewer-glow" aria-hidden="true" />

        {/* Header */}
        <div className="media-viewer-header">
          <div className="media-viewer-header-main">
            <span className="media-viewer-type">
              <span aria-hidden="true">{typeMeta.icon}</span>
              {typeMeta.label}
            </span>
            <h4 id="media-viewer-title" className="media-viewer-title">
              {item.title}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="media-viewer-close"
            aria-label="Close preview"
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

        {/* Media stage */}
        <div
          className={`media-viewer-stage ${
            isImage ? "media-viewer-stage-image" : "media-viewer-stage-video"
          }`}
        >
          {embedUrl && (isVideo || isPdf) && (
            <iframe
              src={embedUrl}
              title={item.title}
              className="media-viewer-iframe"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
          {isImage && thumbUrl && (
            <div className="media-viewer-image-wrap">
              <img
                src={thumbUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="media-viewer-image"
              />
            </div>
          )}
          {!hasMedia && (
            <div className="media-viewer-fallback">
              <span className="media-viewer-fallback-icon" aria-hidden="true">
                {typeMeta.icon}
              </span>
              <p className="media-viewer-fallback-title">Preview unavailable</p>
              <p className="media-viewer-fallback-desc">
                This file couldn&apos;t be loaded here. Open it directly in Google Drive.
              </p>
              {viewUrl && (
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary media-viewer-fallback-btn"
                >
                  Open in Drive ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {hasMedia && viewUrl && (
          <div className="media-viewer-footer">
            <p className="media-viewer-hint">Press Esc to close</p>
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="media-viewer-drive-link"
            >
              Open in Google Drive
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
  );
}
