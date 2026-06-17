"use client";

import { useRef } from "react";

export default function GlowCard({ children, className = "" }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const angle =
      (Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180) / Math.PI;
    cardRef.current.style.setProperty("--start", `${angle + 90}deg`);
  };

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}
