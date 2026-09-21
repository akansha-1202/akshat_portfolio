"use client";

import { useEffect } from "react";
import {
  getMediaUrl,
  getOriginalUrl,
  getThumbnailUrl,
} from "@/app/lib/cloudinary";
import { CachedImage, CachedVideo } from "@/app/components/CachedMedia";

const TYPE_META = {
  video: { label: "Reel", icon: "▶" },
  image: { label: "Post", icon: "🖼" },
  ppt: { label: "PPT", icon: "📄" },
  pdf: { label: "PDF", icon: "📄" },
};

export default function MediaViewer({ item, onClose }) {
  const isVideo = item.type === "video";
  const isImage = item.type === "image";
  const isPpt = item.type === "ppt" || item.type === "pdf";
  const mediaUrl = getMediaUrl(item);
  const posterUrl = isVideo ? getThumbnailUrl(item, 900) : null;
  const originalUrl = getOriginalUrl(item);
  const typeMeta = TYPE_META[item.type] || { label: item.type, icon: "📁" };
  const hasMedia = Boolean(mediaUrl);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="media-viewer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-viewer-title"
      data-lenis-prevent
    >
      <div className="media-viewer" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <div className="media-viewer-glow" aria-hidden="true" />

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

        <div
          className={`media-viewer-stage ${
            isImage || isPpt
              ? "media-viewer-stage-image"
              : "media-viewer-stage-video"
          }`}
        >
          {isVideo && mediaUrl && (
            <CachedVideo
              src={mediaUrl}
              poster={posterUrl}
              title={item.title}
              wrapperClassName="media-viewer-cached"
              className="media-viewer-video"
              controls
              autoPlay
              muted
            />
          )}
          {(isImage || isPpt) && mediaUrl && (
            <div className="media-viewer-image-wrap">
              <CachedImage
                src={mediaUrl}
                alt={item.title}
                loading="eager"
                wrapperClassName="media-viewer-cached"
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
                This file couldn&apos;t be loaded from the CDN.
              </p>
            </div>
          )}
        </div>

        {hasMedia && (
          <div className="media-viewer-footer">
            <p className="media-viewer-hint">Press Esc to close</p>
            {originalUrl && (
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="media-viewer-drive-link"
              >
                Open original
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10L10 2M10 2H4M10 2v6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
