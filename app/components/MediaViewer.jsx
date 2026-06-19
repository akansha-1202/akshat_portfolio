"use client";

import { useEffect } from "react";
import { getDriveEmbedUrl, getDriveThumbnailUrl, getDriveViewUrl } from "@/app/lib/drive";

export default function MediaViewer({ item, onClose }) {
  const embedUrl = getDriveEmbedUrl(item.driveFileId);
  const thumbUrl = getDriveThumbnailUrl(item.driveFileId);
  const viewUrl = getDriveViewUrl(item.driveFileId);
  const isVideo = item.type === "video";
  const isImage = item.type === "image";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/98 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 rounded-full border border-border px-4 py-1.5 text-sm text-muted hover:border-accent hover:text-accent md:-top-12"
        >
          Close ✕
        </button>

        <div className="overflow-hidden rounded-3xl border border-border/50 bg-surface shadow-2xl">
          <div
            className={`relative w-full bg-black ${
              isImage ? "min-h-[50vh]" : "aspect-video"
            }`}
          >
            {embedUrl && (isVideo || item.type === "pdf") && (
              <iframe
                src={embedUrl}
                title={item.title}
                className="h-full min-h-[50vh] w-full border-0 md:min-h-0 md:aspect-video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
            {isImage && thumbUrl && (
              <div className="flex min-h-[50vh] items-center justify-center p-4">
                <img
                  src={thumbUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
                />
              </div>
            )}
            {!embedUrl && !thumbUrl && (
              <div className="flex min-h-[40vh] items-center justify-center text-muted">
                Unable to load preview
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-border p-5 md:p-6">
            <div>
              <h4
                className="text-lg font-bold md:text-xl"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {item.title}
              </h4>
              <p className="mt-1 text-xs capitalize text-muted">{item.type}</p>
            </div>
            {viewUrl && (
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline shrink-0 text-sm"
              >
                Open in Drive ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
