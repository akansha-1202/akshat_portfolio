"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";

export default function AnimatedCounter({ value, suffix = "", label }) {
  const counterRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!counterRef.current || !containerRef.current) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(obj.val).toString();
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="text-center">
      <p
        className="text-3xl font-bold md:text-4xl"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        <span ref={counterRef}>0</span>
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
