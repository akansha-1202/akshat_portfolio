"use client";

import { useEffect, useRef, useState } from "react";

export function MediaSkeleton({ className = "" }) {
  return (
    <div className={`media-skeleton ${className}`} aria-hidden="true">
      <div className="media-skeleton-shimmer" />
    </div>
  );
}

export function CachedImage({
  src,
  alt = "",
  className = "",
  wrapperClassName = "",
  loading = "lazy",
  onLoad,
  onError,
}) {
  const imgRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setStatus("loaded");
    }
  }, [src]);

  if (!src) return <MediaSkeleton className={wrapperClassName || className} />;

  return (
    <div className={`media-frame ${wrapperClassName}`}>
      {status !== "loaded" && status !== "error" && <MediaSkeleton />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`media-frame-asset ${className} ${
          status === "loaded" ? "is-loaded" : "is-loading"
        }`}
        onLoad={(e) => {
          setStatus("loaded");
          onLoad?.(e);
        }}
        onError={(e) => {
          setStatus("error");
          onError?.(e);
        }}
      />
      {status === "error" && (
        <div className="media-frame-error" aria-hidden="true">
          ◆
        </div>
      )}
    </div>
  );
}

export function CachedVideo({
  src,
  poster,
  title,
  className = "",
  wrapperClassName = "",
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
}) {
  const [status, setStatus] = useState(src ? "loading" : "error");

  useEffect(() => {
    setStatus(src ? "loading" : "error");
  }, [src]);

  if (!src) return <MediaSkeleton className={wrapperClassName || className} />;

  return (
    <div className={`media-frame media-frame-video ${wrapperClassName}`}>
      {status === "loading" && <MediaSkeleton />}
      <video
        key={src}
        src={src}
        poster={poster || undefined}
        title={title}
        controls={controls}
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        className={`media-frame-asset ${className} ${
          status === "loaded" ? "is-loaded" : "is-loading"
        }`}
        onLoadedData={() => setStatus("loaded")}
        onCanPlay={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
      {status === "error" && (
        <div className="media-frame-error">
          <p>Video unavailable</p>
        </div>
      )}
    </div>
  );
}
