"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function VideoModal({ project, onClose }) {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} video`}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-sm text-muted transition-colors hover:text-accent"
        >
          Close ✕
        </button>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="relative aspect-video w-full bg-black">
            {!videoError ? (
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                poster={project.poster}
                controls
                autoPlay
                playsInline
                onError={() => setVideoError(true)}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <Image
                  src={project.poster}
                  alt={project.title}
                  fill
                  className="object-cover opacity-30"
                />
                <p className="relative z-10 text-lg text-muted">
                  Add reel to{" "}
                  <code className="text-accent">{project.video}</code>
                </p>
                <p className="relative z-10 text-sm text-muted">
                  Export from Google Drive and place the MP4 in the project folder.
                </p>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {project.title}
            </h3>
            <p className="mt-2 text-muted">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
