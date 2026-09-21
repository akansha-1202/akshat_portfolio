"use client";

import { useEffect, useRef, useState } from "react";
import {
  getMediaUrl,
  getOriginalUrl,
  getPdfPageUrl,
  getThumbnailUrl,
} from "@/app/lib/cloudinary";
import { CachedImage, CachedVideo, MediaSkeleton } from "@/app/components/CachedMedia";

const TYPE_META = {
  video: { label: "Reel", icon: "▶" },
  image: { label: "Post", icon: "🖼" },
  ppt: { label: "PPT", icon: "📄" },
  pdf: { label: "PDF", icon: "📄" },
};

const MAX_PPT_PAGES = 40;

function PptSlide({ publicId, pageNum, title }) {
  return (
    <figure className="media-viewer-ppt-slide">
      <CachedImage
        src={getPdfPageUrl(publicId, pageNum, 1400)}
        alt={`${title} — page ${pageNum}`}
        loading={pageNum === 1 ? "eager" : "lazy"}
        wrapperClassName="media-viewer-ppt-slide-frame"
        className="media-viewer-ppt-slide-img"
      />
      <figcaption className="media-viewer-ppt-slide-label">
        Slide {pageNum}
      </figcaption>
    </figure>
  );
}

function PptPageViewer({ publicId, title }) {
  const [pages, setPages] = useState([1]);
  const [discovering, setDiscovering] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let page = 2;

    setPages([1]);
    setDiscovering(true);

    const discover = () => {
      if (cancelled || page > MAX_PPT_PAGES) {
        if (!cancelled) setDiscovering(false);
        return;
      }

      const img = new window.Image();
      img.onload = () => {
        if (cancelled) return;
        setPages((prev) => (prev.includes(page) ? prev : [...prev, page]));
        page += 1;
        discover();
      };
      img.onerror = () => {
        if (!cancelled) setDiscovering(false);
      };
      img.src = getPdfPageUrl(publicId, page, 80);
    };

    discover();

    return () => {
      cancelled = true;
    };
  }, [publicId]);

  return (
    <div
      ref={scrollRef}
      className="media-viewer-ppt-scroll"
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {pages.map((pageNum) => (
        <PptSlide
          key={`${publicId}-${pageNum}`}
          publicId={publicId}
          pageNum={pageNum}
          title={title}
        />
      ))}

      {discovering && (
        <>
          <div className="media-viewer-ppt-slide media-viewer-ppt-slide-pending" aria-hidden="true">
            <MediaSkeleton className="media-viewer-ppt-slide-skeleton" />
            <span className="media-viewer-ppt-slide-label">Loading…</span>
          </div>
          <div className="media-viewer-ppt-slide media-viewer-ppt-slide-pending" aria-hidden="true">
            <MediaSkeleton className="media-viewer-ppt-slide-skeleton" />
          </div>
        </>
      )}
    </div>
  );
}

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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("lenis:stop"));

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      // Keep Lenis stopped while the parent gallery modal is still open.
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
      data-lenis-prevent
    >
      <div
        className={`media-viewer ${isPpt ? "media-viewer-ppt-mode" : ""}`}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
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
          } ${isPpt ? "media-viewer-stage-ppt" : ""}`}
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
          {isImage && mediaUrl && (
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
          {isPpt && item.publicId && (
            <PptPageViewer publicId={item.publicId} title={item.title} />
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
            <p className="media-viewer-hint">
              {isPpt ? "Scroll to browse slides · Esc to close" : "Press Esc to close"}
            </p>
            {originalUrl && !isPpt && (
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
